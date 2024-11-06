<template>
  <div class="h-screen relative grid grid-cols-2 gap-5">
    <div>
      <v-select v-model="selectEmp" class="text-md v-select-style" :options="employees" @option:selected="filterEmployee"  label="label" placeholder="Select employee"></v-select>
      <hr class="border border-gray-300 my-5">
      <div>
          <div class="relative my-5">
            <label for="name" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Name</label>
            <input type="text" v-model="name" name="name" disabled id="name" class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emsBlue sm:text-sm/6" >
          </div>
          <div class="relative mb-5">
            <label for="name" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Birthday</label>
            <input type="text" v-model="birthday" name="birthday" disabled id="birthday" class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emsBlue sm:text-sm/6">
          </div>
          <div class="relative mb-5">
            <label for="name" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Company</label>
            <input type="text" v-model="company" name="company" disabled id="company" class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emsBlue sm:text-sm/6">
          </div>
          <div class="relative mb-5">
            <label for="name" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Date Hired</label>
            <input type="date" v-model="date_hired" name="date_hired" disabled id="date_hired" class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emsBlue sm:text-sm/6">
          </div>
          <div class="relative mb-5">
            <label for="name" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Position</label>
            <input type="text" v-model="position" name="position" disabled id="position" class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emsBlue sm:text-sm/6">
          </div>
          <div class="relative mb-5">
            <label for="name" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Reports at (Office or Project)</label>
            <input type="text" v-model="report_at" name="report_at" disabled id="report_at" class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emsBlue sm:text-sm/6">
          </div>
          <div class="relative mb-5">
            <label for="name" class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">Schedule</label>
            <input type="text" v-model="schedule" name="schedule" disabled id="schedule" class="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-emsBlue sm:text-sm/6">
          </div>
      </div>
    </div>
    <div>
      <div v-show="initializing" class="border-2 border-emsBlue rounded-lg h-[480px] w-[640px] flex justify-center items-center text-gray-500">
        <LottieAnimation class="w-[480px] h-[480px]" :animation-data="Camera " :auto-play="true" :loop="true" :speed="1" ref="anim" />
      </div>
      <div class="relative" v-show="!initializing">
        <video ref="video" autoplay playsinline width="640" height="480" class="border-double border-4 rounded-lg border-emsBlue"></video>
        <canvas ref="canvas" style="position: absolute; top: 0; left: 0;"></canvas>
        <p class="text-emsBlue text-lg font-bold text-center my-5" >{{ registrationStatus }}</p>
        
      </div>
      
    </div>
        
    
    
    <!-- <input v-model="employeeData.name" type="text" class="py-1 px-5 border border-gray-400 text-gray-600" placeholder="Employee Name">
    <button class="text-gray-600" @click="registerEmployee">Register Employee</button> -->
   
  </div>
</template>

<script setup>
import { LottieAnimation } from "lottie-web-vue";
import Camera from "@/assets/lottie/camera.json";
import { successMessage, errorMessage } from "@/utils/toast.js";
</script>

<script>
import * as faceapi from 'face-api.js';
import axios from 'axios';



export default {
  data() {
    return {
      initializing: true,
      allGood: false,
      selectEmp: '',
      video: null,
      canvas: null,
      employees: [],
      name: '',
      birthday: '',
      company:'',
      date_hired:'',
      position: '',
      report_at: '',
      schedule: '',
      registrationStatus: '',
      headMovementPrompt:false,
      employeeData: {
        employee_id:'',
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

   
    await this.fetchEmployees();
  },
  methods: {
   async filterEmployee(data){

        this.employeeData.employee_id = data.value
        this.initializing = false

        axios.get(import.meta.env.VITE_API_URL+'/get-employee-info?employee_id='+data.value).then(async (response) => {

          this.name = response.data.data.name
          this.birthday = response.data.data.birthday 
          this.company = response.data.data.company
          this.date_hired = response.data.data.date_hired
          this.position = response.data.data.position
          this.report_at = response.data.data.report_at
          this.schedule = response.data.data.schedule
          await this.startCamera();
        })
    },
    async fetchEmployees(){
      axios.get(import.meta.env.VITE_API_URL+'/get-face-recognation-employees').then((response) =>{
        this.employees = response.data.data
      })
    },
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
          
          if (distanceFromCamera < 40) {
              if (!eyeOpen) {
                this.registrationStatus = 'Please blink to confirm you are a live person.';
              } else {
                this.allGood = true
                this.submitFace();
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

    async submitFace(){
  
      const canvasElement = this.canvas;
      const imageData = canvasElement.toDataURL('image/png');
      this.employeeData.image = imageData;
      console.log(this.employeeData)
      if (!this.employeeData.employee_id || !this.employeeData.image) {
        
        errorMessage("Oops!", "Please select employee and ensure the face is detected!", "bottom-right");
        return;
      }

      try {
        const checkResponse = await axios.post(import.meta.env.VITE_API_URL+'/check-face', {
          face_encoding: this.employeeData.face_encoding,
          employee_id: this.employeeData.employee_id
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log(checkResponse.data.message)
        if (checkResponse.data.success === false) {
          errorMessage("Oops!", "Face already registered!", "bottom-right");
          this.employeeData.employee_id = ''
          this.name = ''
          this.birthday = ''
          this.company = ''
          this.date_hired = ''
          this.position = ''
          this.report_at = ''
          this.schedule = ''
          this.selectEmp = ''
          this.initializing = true
          this.employeeData.face_encoding = []
          this.employeeData.image = null
          return;
        }

        // Save new employee data
        const response = await axios.post(import.meta.env.VITE_API_URL+'/save-face', this.employeeData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.data.success) {
          this.initializing = true
          this.selectEmp = ''
          successMessage("Yay!", "Employee registered successfully!", "bottom-right");

          this.employeeData.employee_id = ''
          this.name = ''
          this.birthday = ''
          this.company = ''
          this.date_hired = ''
          this.position = ''
          this.report_at = ''
          this.schedule = ''

          this.employeeData.employee_id = ''
          this.employeeData.face_encoding = []
          this.employeeData.image = null
        } else {
          errorMessage("Oops!", "Error during registration.", "bottom-right");
          this.selectEmp = ''
          this.initializing = true
          this.employeeData.employee_id = ''
          this.name = ''
          this.birthday = ''
          this.company = ''
          this.date_hired = ''
          this.position = ''
          this.report_at = ''
          this.schedule = ''

          this.employeeData.face_encoding = []
          this.employeeData.image = null
        }
      } catch (error) {
          errorMessage("Oops!", "Error during registration.", "bottom-right");
          this.selectEmp = ''
          this.initializing = true
          this.employeeData.employee_id = ''
          this.name = ''
          this.birthday = ''
          this.company = ''
          this.date_hired = ''
          this.position = ''
          this.report_at = ''
          this.schedule = ''
          this.employeeData.face_encoding = []
          this.employeeData.image = null
      }


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

<style>
.v-select-style .vs__search::placeholder,
.v-select-style .vs__dropdown-toggle,
.v-select-style .vs__dropdown-menu {
  background: #fff;
 
  color: #606271;
  text-transform: lowercase;
  font-variant: small-caps;
  padding:10px;
}

.v-select-style .vs__clear,
.v-select-style .vs__open-indicator {
  fill: #394066;
}

</style>