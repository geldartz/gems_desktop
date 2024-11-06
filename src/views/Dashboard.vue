<template>
    <div class="w-full p-5 mx-auto">
      <div class="relative flex border-b border-gray-300">
        <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = index" class="relative flex-1 py-2 text-center text-gray-600 cursor-pointer transition-colors hover:text-blue-500" :class="{ 'text-blue-600 font-semibold': activeTab === index }" > {{ tab.name }} </button>
        <span
          class="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300"
          :style="{ width: `${100 / tabs.length}%`, transform: `translateX(${activeTab * 100}%)` }"
        ></span>
      </div>
      <div class="p-5">
        <transition name="fade-slide" mode="out-in">
        <component :is="tabs[activeTab].component" :key="activeTab" />
        </transition>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  

  import RegisterFace from '@/views/tabs/RegisterFace.vue';
  import ManualPage from '@/views/tabs/Manual.vue';
  import Logs from '@/views/tabs/Logs.vue';
  import Settings from '@/views/tabs/Settings.vue';

  const activeTab = ref(0);
  const tabs = ref([
    { name: 'Face Registration', component: RegisterFace },
    { name: 'Manual Clock In/Clock Out', component: ManualPage },
    { name: 'Logs', component: Logs },
    { name: 'Settings', component: Settings },
    ]);
  </script>
  
  <style scoped>
  /* Transition for tab content */
  .fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .fade-slide-enter-from {
    opacity: 0;
    transform: translateY(10px);
  }
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
  