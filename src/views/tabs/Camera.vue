<template>
    <div>
      <video  ref="video" autoplay></video>
      <canvas  ref="overlay"></canvas>
    </div>
  </template>
  
  <script setup>
import * as faceapi from 'face-api.js';
import { ref, onMounted } from 'vue';

const video = ref(null);
const overlay = ref(null);

async function loadModels() {
  const MODEL_URL = 'models'; // Adjust path if needed
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
}

onMounted(async () => {
  // Load all models before starting video stream
  await loadModels();

  const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
  video.value.srcObject = stream;

  video.value.addEventListener('play', async () => {
    const displaySize = { width: video.value.width, height: video.value.height };
    faceapi.matchDimensions(overlay.value, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video.value, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      overlay.value.getContext('2d').clearRect(0, 0, overlay.value.width, overlay.value.height);
      faceapi.draw.drawDetections(overlay.value, resizedDetections);
      faceapi.draw.drawFaceLandmarks(overlay.value, resizedDetections);
    }, 100);
  });
});
  </script>
  