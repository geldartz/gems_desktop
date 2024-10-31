<template>
    <div>
      <input class="border border-gray-400" type="text" v-model="userName" placeholder="Enter your name" />
      <video ref="video" autoplay @loadedmetadata="onVideoReady"></video>
      <canvas ref="overlay"></canvas>
      <button class="border border-blue-600 bg-blue-800" @click="registerFace" :disabled="!modelsLoaded || !videoReady">
        Register Face
      </button>
      <p v-if="!modelsLoaded">Loading models, please wait...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as faceapi from 'face-api.js';
  
  const video = ref(null);
  const userName = ref('');
  const modelsLoaded = ref(false);
  const videoReady = ref(false);  // New state for video readiness
  
  async function loadModels() {
    const MODEL_URL = 'models';
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      modelsLoaded.value = true;
    } catch (error) {
      console.error('Error loading models:', error);
    }
  }
  
  onMounted(async () => {
    await loadModels();
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.value.srcObject = stream;
  });
  
  const onVideoReady = () => {
    videoReady.value = true;  // Set video readiness when metadata loads
  };
  
  const registerFace = async () => {
    if (!modelsLoaded.value || !videoReady.value) {
      alert('Models or video are still loading. Please wait.');
      return;
    }
  
    if (!userName.value) {
      alert('Please enter a name');
      return;
    }
  
    try {
      const detections = await faceapi
        .detectSingleFace(video.value, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();
  
      if (!detections) {
        alert('No face detected. Try again.');
        return;
      }
  
      const newFaceData = { label: userName.value, descriptor: detections.descriptor };
  
    // const result = await window.electronAPI.saveFaceData(newFaceData);
    // const result = await ipcRenderer.invoke('save-face-data', newFaceData);
    const result = await window.electronAPI.saveFaceData(newFaceData);
    
  
      alert(`${userName.value} registered successfully!`);
      userName.value = '';
    } catch (error) {
      console.error('Error in face registration:', error);
    }
  };
  </script>
  