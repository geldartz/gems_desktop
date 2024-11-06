<!-- <template>
  <div class="bg-[#efefef] h-screen overflow-hidden relative">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script> -->


<template>
  <div class="grid grid-cols-4">
      <div class="w-full border border-gray-400 px-5 h-screen shadow-lg bg-white z-[101]">
          <div class="my-5">
              <img class="h-[100px] w-auto block mx-auto" src="/public/logo/logo.png" alt="GEMS LOGO">
          </div>
          <hr class="my-4 border border-gray-300">
          <div class="flex flex-col items-center justify-center w-[80%] mx-auto h-[800px]">
              <router-link to="/clock-in" class="flex-initial w-full flex items-center justify-between border border-gray-400 rounded-md shadow-md bg-green-600 hover:bg-green-400 p-4 mb-5 cursor-pointer">
                      <LottieAnimation  class="rounded-lg bg-white flex-initial w-20 h-20 mr-10" :animation-data="ClockInAnim" :auto-play="true" :loop="true" :speed="1" ref="anim" />
                      <h3 class="flex-1 text-white font-bold text-2xl">CLOCK IN</h3>
              </router-link>
              <router-link to="/clock-out" class="flex-initial w-full flex items-center justify-between border border-gray-400 rounded-md shadow-md bg-red-600 hover:bg-red-400 p-4 mb-5 cursor-pointer">
                      <LottieAnimation  class="rounded-lg bg-white flex-initial w-20 h-20 mr-10" :animation-data="ClockOutAnim" :auto-play="true" :loop="true" :speed="1" ref="anim" />
                      <h3 class="flex-1 text-white font-bold text-2xl">CLOCK OUT</h3>
              </router-link>
              <router-link :to="userAuthStore().authenticated ? '/dashboard'  : '/login'" class="flex-initial w-full flex items-center justify-between border border-gray-400 rounded-md shadow-md bg-blue-600 hover:bg-blue-400 p-4 mb-5 cursor-pointer">
                      <LottieAnimation  class="rounded-lg bg-white flex-initial w-20 h-20 mr-10" :animation-data="AdminAnim" :auto-play="true" :loop="true" :speed="1" ref="anim" />
                      <h3 class="flex-1 text-white font-bold text-2xl">{{ userAuthStore().authenticated ? 'DASHBOARD' : 'ADMIN LOGIN' }} </h3>
              </router-link>
          </div>
      </div>
      <div class="col-span-3 h-screen bg-slate-50 overflow-y-auto overflow-x-hidden">
          <router-view>
            
          </router-view>
      </div>
  </div>
</template>


<script setup>
import { onMounted, reactive, ref, watch, computed, provide, inject, onUpdated, nextTick   } from "vue";
import {userAuthStore} from '@/stores/auth';
import { LottieAnimation } from "lottie-web-vue";

import ClockInAnim from "@/assets/lottie/clockin.json"
import ClockOutAnim from "@/assets/lottie/clockout.json"
import AdminAnim from "@/assets/lottie/admin.json"



</script>
