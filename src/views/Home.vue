
<template>
    <div class="flex justify-center items-center h-full w-full">
        <LottieAnimation v-if="tab == 'none'" class="w-[600px] h-[600px]" :animation-data="FaceAnim " :auto-play="true" :loop="true" :speed="1" ref="anim" />
    </div>
   
</template>


<script setup>
import { onMounted, reactive, ref, watch, computed, provide, inject, onUpdated, nextTick   } from "vue";

import { LottieAnimation } from "lottie-web-vue";
import FaceAnim from "@/assets/lottie/face.json"
import ClockInAnim from "@/assets/lottie/clockin.json"
import ClockOutAnim from "@/assets/lottie/clockout.json"
import AdminAnim from "@/assets/lottie/admin.json"

import CameraView from '@/views/tabs/Camera.vue';
import RegisterFace from '@/views/tabs/RegisterFace.vue';
import Login from '@/views/pages/Login.vue';

const tab = ref('none')

function setTab(name){
    tab.value = name;
}




</script>
