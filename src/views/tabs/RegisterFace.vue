<template>
  <div style="position: relative;">
    <video ref="video" autoplay playsinline width="640" height="480"></video>
    <canvas ref="canvas" style="position: absolute; top: 0; left: 0;"></canvas>
    <input v-model="employeeData.name" type="text" class="py-1 px-5 border border-gray-400 text-gray-600" placeholder="Employee Name">
    <button class="text-gray-600" @click="registerEmployee">Register Employee</button>
    <div class="text-gray-600" v-if="registrationStatus">{{ registrationStatus }}</div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js';
import axios from 'axios'; // Import Axios

export default {
  data() {
    return {
      video: null,
      canvas: null,
      registrationStatus: '',
      headMovementPrompt:false,
      employeeData: {
        name: '',
        face_encoding: [],
        image: null,
      },
    };
  },
  async mounted() {
    this.video = this.$refs.video;
    this.canvas = this.$refs.canvas;

    // Load face-api.js models
    await faceapi.nets.tinyFaceDetector.loadFromUri('models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('models'); // Load face recognition model

    await this.startCamera();
  },
  methods: {
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.video.srcObject = stream;

        this.video.onloadedmetadata = () => {
          this.video.play();
          this.canvas.width = this.video.videoWidth; 
          this.canvas.height = this.video.videoHeight; 
          this.detectFaces();
        };
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    },
    async detectFaces() {
      const context = this.canvas.getContext('2d');

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors(); // Get face descriptor for recognition

        context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas
       
        if (detections.length > 0) {
          const resizedDetections = faceapi.resizeResults(detections, { width: this.canvas.width, height: this.canvas.height });
          faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);

          // Store face descriptor of the detected face for registration
          this.employeeData.face_encoding = detections[0].descriptor;

          const box = resizedDetections[0].detection.box;
          const width = box.width;
          const height = box.height;

          const landmarks = resizedDetections[0].landmarks; // Get the landmarks of the first detection
          const leftEye = landmarks.getLeftEye(); // Use getLeftEye() and getRightEye()
          const rightEye = landmarks.getRightEye();

          const eyeOpen = this.checkEyesOpen(leftEye, rightEye);
          const distanceFromCamera = this.calculateDistance(width, height);
          
          if (distanceFromCamera < 30) {
              if (!eyeOpen) {
                this.registrationStatus = 'Please blink to confirm you are a live person.';
              } else {
                this.registrationStatus = 'You are close enough!';
              }
            } else {
              this.registrationStatus = 'Please move closer to the camera.';
            }

          if (!this.headMovementPrompt) {
            this.registrationStatus = 'Please move your head left and right.';
            this.headMovementPrompt = true;
          }
        }
      }, 500);
    },
    checkEyesOpen(leftEye, rightEye) {
      const leftEyeOpen = Math.abs(leftEye[1].y - leftEye[5].y) > 10;
      const rightEyeOpen = Math.abs(rightEye[1].y - rightEye[5].y) > 10;

      return leftEyeOpen && rightEyeOpen; 
    },
    calculateDistance(width, height) {

      const averageFaceWidthInCm = 14; 
      const focalLength = 600; 

      const distance = (averageFaceWidthInCm * focalLength) / width;
      return distance;
    },

    async registerEmployee() {
      const canvasElement = this.canvas;
      const imageData = canvasElement.toDataURL('image/png');

      this.employeeData.image = imageData;


      if (!this.employeeData.name || !this.employeeData.image) {
        this.registrationStatus = 'Please provide a name and ensure the face is detected!';
        return;
      }

      // Check if face is already registered
      try {
        const checkResponse = await axios.post('http://gems.test/api/check-face', {
          face_encoding: this.employeeData.face_encoding
        }, {
          headers: { 'Content-Type': 'application/json' }
        });

        if (checkResponse.data.success === false) {
          this.registrationStatus = 'Face already registered!';
          this.employeeData.name = ''
          this.employeeData.face_encoding = []
          this.employeeData.image = null
          return;
        }

        // Save new employee data
        const response = await axios.post('http:gems.test/api/save-face', this.employeeData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          this.registrationStatus = 'Employee registered successfully!';
          this.employeeData.name = ''
          this.employeeData.face_encoding = []
          this.employeeData.image = null
        } else {
          this.registrationStatus = 'Error during registration.';
          this.employeeData.name = ''
          this.employeeData.face_encoding = []
          this.employeeData.image = null
        }
      } catch (error) {
        console.error("Error saving employee data: ", error);
        this.employeeData.name = ''
          this.employeeData.face_encoding = []
          this.employeeData.image = null
        this.registrationStatus = 'Error registering employee.';
      }
    },
  },
};
</script>
