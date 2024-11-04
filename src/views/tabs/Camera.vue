<template>
  <div style="position: relative;">
    <video ref="video" autoplay playsinline width="640" height="480"></video>
    <canvas ref="canvas" style="position: absolute; top: 0; left: 0;"></canvas>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js';

export default {
  data() {
    return {
      video: null,
      canvas: null,
    };
  },
  async mounted() {
    this.video = this.$refs.video;
    this.canvas = this.$refs.canvas;

    // Load models
    await faceapi.nets.tinyFaceDetector.loadFromUri('models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('models');

    await this.startCamera();
  },
  methods: {
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.video.srcObject = stream;

        this.video.onloadedmetadata = () => {
          this.video.play();
          this.canvas.width = this.video.videoWidth; // Set canvas size
          this.canvas.height = this.video.videoHeight; // Set canvas size
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
          .withFaceLandmarks();

        console.log("Detections: ", detections); // Debugging line
        context.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear canvas

        if (detections.length > 0) {
          const resizedDetections = faceapi.resizeResults(detections, { width: this.canvas.width, height: this.canvas.height });
          faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);
        } else {
          console.log("No faces detected"); // Log if no faces are detected
        }
      }, 100);
    },
  },
};
</script>
