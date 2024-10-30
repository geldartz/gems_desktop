
<template>
  <div class="h-screen bg-white flex items-center justify-center">

    <div class="flex-initial w-60 h-60 border border-blue-600 rounded-lg mx-2">
      <span>CLOCK IN</span>
    </div>
    <div class="flex-initial w-60 h-60 border border-blue-600 rounded-lg mx-2">
      <span>CLOCK OUT</span>
    </div>
  </div>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'



</script>