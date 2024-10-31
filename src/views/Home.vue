
<template>
    <div class="grid grid-cols-4">
        <div class="w-full border border-gray-400 px-5 h-screen shadow-lg bg-white">
            <div class="my-5">
                <img class="h-[100px] w-auto block mx-auto" src="/public/logo/logo.png" alt="GEMS LOGO">
            </div>
            <hr class="my-4 border border-gray-300">
            <div class="flex flex-col items-center justify-center w-[80%] mx-auto h-[800px]">
                <div @click="setTab('clockin')" class="flex-initial w-full flex items-center justify-between border border-gray-400 rounded-md shadow-md bg-green-600 hover:bg-green-400 p-4 mb-5 cursor-pointer">
                        <LottieAnimation  class="rounded-lg bg-white flex-initial w-20 h-20 mr-10" :animation-data="ClockInAnim" :auto-play="true" :loop="true" :speed="1" ref="anim" />
                        <h3 class="flex-1 text-white font-bold text-2xl">CLOCK IN</h3>
                </div>
                <div @click="setTab('clockout')" class="flex-initial w-full flex items-center justify-between border border-gray-400 rounded-md shadow-md bg-red-600 hover:bg-red-400 p-4 mb-5 cursor-pointer">
                        <LottieAnimation  class="rounded-lg bg-white flex-initial w-20 h-20 mr-10" :animation-data="ClockOutAnim" :auto-play="true" :loop="true" :speed="1" ref="anim" />
                        <h3 class="flex-1 text-white font-bold text-2xl">CLOCK OUT</h3>
                </div>
                <div @click="setTab('login')" class="flex-initial w-full flex items-center justify-between border border-gray-400 rounded-md shadow-md bg-blue-600 hover:bg-blue-400 p-4 mb-5 cursor-pointer">
                        <LottieAnimation  class="rounded-lg bg-white flex-initial w-20 h-20 mr-10" :animation-data="AdminAnim" :auto-play="true" :loop="true" :speed="1" ref="anim" />
                        <h3 class="flex-1 text-white font-bold text-2xl">ADMIN LOGIN</h3>
                </div>
            </div>
        </div>
        <div class="col-span-3  p-5 h-screen bg-slate-50 flex items-center justify-center">
            <LottieAnimation v-if="tab == 'none'" class="w-[600px] h-[600px]" :animation-data="FaceAnim " :auto-play="true" :loop="true" :speed="1" ref="anim" />
            <CameraView v-else-if="tab == 'clockin'"></CameraView>
            <RegisterFace v-else></RegisterFace>
        </div>
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

const tab = ref('none')

function setTab(name){
    tab.value = name;
}




</script>
