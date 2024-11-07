<template>
    <div class="flex justify-center items-center mt-10">
        <div class="relative">
            <h3 class="text-emsBlue text-3xl font-bold text-center my-2">CLOCK OUT</h3>
            <video ref="video" autoplay playsinline width="854" height="480" class="border-double border-4 rounded-lg border-emsBlue"></video>
            <canvas ref="canvas" style="position: absolute; top: 0; left: 0;"></canvas>
            <p  class="text-emsBlue text-lg font-bold text-center my-5" v-if="initializing">{{ registrationStatus }}</p>
            <p v-if="!initializing" class="text-emsBlue text-lg font-bold text-center my-5">{{ prompt_text }}</p>
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
      prompt_text:'',
      video: null,
      canvas: null,
      name: '',
      registrationStatus: '',
      headMovementPrompt:false,
      employee_id: '',
      schedule_id: '',
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
    stopCamera() {
      const stream = this.video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        this.video.srcObject = null;
      }
    },
    async detectFaces() {
      const context = this.canvas.getContext('2d');

      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();

        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
        if (detections.length > 0) {
          const resizedDetections = faceapi.resizeResults(detections, { width: this.canvas.width, height: this.canvas.height });
          faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);

          this.face_encoding = detections[0].descriptor;

          const box = resizedDetections[0].detection.box;
          const width = box.width;
          const height = box.height;

          const landmarks = resizedDetections[0].landmarks;
          const leftEye = landmarks.getLeftEye();
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
            if(response.data.data.name == undefined){
              this.prompt_text = "Your face is not recognized in our system. Please reach out to HR to complete your registration."
              this.stopCamera();
              setTimeout(() => {
                
                this.$router.push('/')
              }, 3000);
              
            }else{

              this.prompt_text = "Hi "+ response.data.data.name +"!\n Please hold on while I submit your daily clock-in."
              this.employee_id = response.data.data.id
              this.schedule_id = response.data.data.schedule_id
              setTimeout(() => {
                this.processClockOut();
              }, 2000);
            }
            
        });
    },
    async processClockOut(){
      await axios.post(import.meta.env.VITE_API_URL+'/process-clock-out', {
        employee_id: this.employee_id,
        schedule_id: this.schedule_id,
      }).then((reponse) => {
        console.log(reponse.data.data)
         this.prompt_text = "You successfully clocked out at "+this.getCurrentTime()+".";
         this.stopCamera();
        setTimeout(() => {
          this.$router.push('/')
          }, 3000);
      })
    },
     getCurrentTime() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const amPm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12 || 12; 

      return `${hours}:${minutes} ${amPm}`;
    },
  }
}

</script>
