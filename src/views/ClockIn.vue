<template>
    <div class="flex justify-center items-center mt-10">
        <div class="relative">
            <video ref="video" autoplay playsinline width="854" height="480" class="border-double border-4 rounded-lg border-emsBlue"></video>
            <canvas ref="canvas" style="position: absolute; top: 0; left: 0;"></canvas>
            <p  class="text-emsBlue text-lg font-bold text-center my-5" v-if="initializing">{{ registrationStatus }}</p>
            <p v-if="!initializing" class="text-emsBlue text-lg font-bold text-center my-5">Hi {{ employee_name }}!</p>
        </div>
    </div>
</template>

<script setup>
import { successMessage, errorMessage } from "@/utils/toast.js";
</script>

<script>
import * as faceapi from 'face-api.js';
import axios from 'axios';


export default {
    data() {
    return {
      initializing: true,
      employee_name:'',
      video: null,
      canvas: null,
      name: '',
      registrationStatus: '',
      headMovementPrompt:false,
      face_encoding: [],
      submitted: false,
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
        const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 854, height: 600 }
        });
        this.video.srcObject = stream;
        this.video.onloadedmetadata = () => {
          this.video.play();
            this.canvas.width = this.video.videoWidth;
            this.canvas.height = this.video.videoHeight; 
          this.detectFaces();
          
        };
      } catch (error) {
        errorMessage("Oops!", "Error accessing camera.", "bottom-right");
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
          this.face_encoding = detections[0].descriptor;

          const box = resizedDetections[0].detection.box;
          const width = box.width;
          const height = box.height;

          const landmarks = resizedDetections[0].landmarks; // Get the landmarks of the first detection
          const leftEye = landmarks.getLeftEye(); // Use getLeftEye() and getRightEye()
          const rightEye = landmarks.getRightEye();

          const eyeOpen = this.checkEyesOpen(leftEye, rightEye);
          const distanceFromCamera = this.calculateDistance(width, height);
          
          if (distanceFromCamera < 40 && !this.submitted) {
              if (!eyeOpen) {
                this.registrationStatus = 'Please blink to confirm you are a live person.';
              } else {
                this.allGood = true
                await this.checkEmployee();
                this.submitted = true;
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

    async checkEmployee(){
         await axios.post(import.meta.env.VITE_API_URL+'/check-employee-face', {
          face_encoding: this.face_encoding,
        }, {
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            this.initializing = false
            console.log(response.data.data)
            this.employee_name = response.data.data.first_name +' '+ response.data.data.last_name
        });

        
    }
  }
}

</script>
