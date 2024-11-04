<template>
    <div class="flex flex-1 h-screen">
      <!-- <div class="top-wave-container "></div> -->
      <div class="video-background">
        <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/juoBoc5yOZ4?autoplay=1&controls=0&showinfo=0&loop=1&mute=0" 
            title="Chatelard Ready Home in Crosswinds Tagaytay | Luxury Homes by Brittany" 
            frameborder="0" 
            allow="autoplay;" 
            allowfullscreen>
        </iframe>
    </div>
    <!-- https://www.youtube.com/embed/M7LW_dF2p4w?autoplay=1&controls=0&showinfo=0&loop=1&mute=1&playlist=M7LW_dF2p4w-->
    <!-- https://www.youtube.com/embed/juoBoc5yOZ4 -->
   
        <div class="absolute w-[550px] bg-[#ffffffee] h-[120%] end-0 px-[50px]" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1500">    
          <div class="mt-[180px] relative">
            <img class="h-24 mb-5 w-auto d-block mx-auto" src="http://proptech.test/images/proptech-logo.png" alt="Proptech" />
            <form @submit.prevent="handleLogin" @keydown="form.onKeydown($event)" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                <div class="mt-2">
                  <input v-model="form.email" id="email" name="email" type="email" 
                  class="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none p-2" :class="[ form.errors.has('password') ? 'border-red-500': 'border-grey-500'] " />
                  <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" v-if="form.errors.has('email')">{{ form.errors.get('email') }}</span>
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="mt-2">
                  <input  v-model="form.password" id="password" name="password" type="password" 
                  class="text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none p-2" :class="[ form.errors.has('password') ? 'border-red-500': 'border-grey-500'] " />
                  <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" v-if="form.errors.has('password')">{{ form.errors.get('password') }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
                  <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700">Remember me</label>
                </div>

                <div class="text-sm leading-6">
                  <a href="#" class="font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
                </div>
              </div>

              <div>
                <SolidButton :isLoading="form.busy" label="Login" :icon="LockClosedIcon"></SolidButton>
                <!-- <button type="submit" :disabled="form.busy" class="flex w-full justify-center rounded-md bg-[#0346fc] px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Login</button> -->
              </div>
            </form>
           
          </div>

          <div class="mt-10">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-blue-400" />
              </div>
              <div class="relative flex justify-center text-sm font-medium leading-6">
                <span class="bg-white rounded-md shadow-sm px-6 text-gray-800">By logging in, you agree to our</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-2">
              
              <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md border-blue-600 border px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
                <span class="text-sm font-semibold leading-6 text-[#0346fc]">Privacy Policy</span>
              </a>

              <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md border-blue-600 border px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
                
                <span class="text-sm font-semibold leading-6 text-[#0346fc]">Terms & Condition</span>
              </a>
            </div>
          </div>
        
        </div>
        <div class="wave-container"></div>
  
      <!-- <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        
      </div> -->
    


    </div>
  </template>

  <script setup>
  import { reactive, ref } from 'vue';
  import Form from 'vform'
//   import {siteSettings} from '@/store/utils';
//   import {userAuthStore} from '@/store/auth';
//   import { successMessage, errorMessage } from "@/utilities/toast.js";
  import SolidButton from '@/components/buttons/SolidButton.vue';
  import { LockClosedIcon } from '@heroicons/vue/24/outline';

    const form = reactive(new Form({
        email: '',
        password: '',
    }));

    const processing = ref(false)


    function handleLogin(){
      axios.get('/sanctum/csrf-cookie').then(response => {
        form.post("/api/login").then((data) => {

            if(data.data.success){
            //   userAuthStore().authenticated = true
            //   userAuthStore().user = data.data.data
            //   userAuthStore().redirect();
            }else{
              
            }
          })
          .catch(({ response }) => {
            // errorMessage("Oops!", "These credentials do not match our records.", "top-right");
          })
          .finally(() => {
          });
      });
                 
    }
 
   

    // export default{
    //   name:'LoginPage',
    //   data(){
    //     return{
    //       form: new Form({
    //         email: '',
    //         password:'',
    //       }),
    //       processing: false,
    //       isLoggedIn:false,
    //     }
    //   },
    //   methods:{
    //     async handleLogin(){

    //       await axios.get("/sanctum/csrf-cookie");
    //       await this.form.post("/api/login").then((data) => {
             
    //                if(data.data.success){
    //                 this.isLoggedIn = true
    //                 siteSettings().aside = false;
    //                 siteSettings().theme = 'light';
    //                 userAuthStore().authenticated = data.data.success
    //                 userAuthStore().user = data.data.data
                    
    //                 userAuthStore().redirect();
    //                }else{
    //                 this.isLoggedIn = false
    //                }
    //             })
    //             .catch(({ response }) => {
    //                 this.isLoggedIn =false
    //             })
    //             .finally(() => {
    //             });
    //     }
    //   }
    // }
  </script>




<style>
/* .video-background{
   position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
} */
.video-background{
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.video-background iframe {
  overflow: hidden;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 115%; /* Increase width to zoom in and remove padding */
            height: 115%; /* Increase height to zoom in */
            transform: translate(-50%, -50%); /* Center the video */
        }
#slideshow {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  animation: slideAnimation 30s infinite;
}

/* First slide */
.slide:nth-child(1) {
  animation-delay: 0s;
}

/* Second slide */
.slide:nth-child(2) {
  animation-delay: 10s;
}

/* Third slide */
.slide:nth-child(3) {
  animation-delay: 20s;
}

/* Keyframes for fading and sliding images */
@keyframes slideAnimation {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  33% {
    opacity: 1;
  }
  43% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.top-wave-container{
  height: 20vh;
  position: relative;
  z-index: 100;
  position: absolute;
  top: 0;
  width: 100%;
}
.top-wave-container::before {   
  content: "";
  width: 100%;
  height: 70px;
  opacity: .9;
  position: absolute;
  top: -0.3%;
  left: 0;
  rotate: 180deg;
  background-size: auto;
  background-repeat: repeat no-repeat;
  background-position: 38vw top;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1200  134' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 98L50 92C100 86 200 74 300 50C400 26 500 -10 600 2C700 14 800 74 900 98C1000 122 1100 110 1150 104L1200 98V134H1150C1100 134 1000 134 900 134C800 134 700 134 600 134C500 134 400 134 300 134C200 134 100 134 50 134H0V98Z' fill='%231681ee'/></svg>");

}
@media(max-width:850px) {
  .wave-container::before {    
    height: 27.5px
  }  
}

.wave-container {  
  position: relative;
  z-index: 100;
  position: fixed;
  bottom: 0;
  width: 100%;

}

.wave-container::before {   
  content: "";
  width: 100%;
  height: 154px;
  position: absolute;
  bottom: -0.3%;
  /* opacity: .9; */
  left: 0;
  background-size: auto;
  background-repeat: repeat no-repeat;
  background-position: 38vw bottom;
  background-image: url("data:image/svg+xml;utf8,<svg viewBox='0 0 1200  134' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 98L50 92C100 86 200 74 300 50C400 26 500 -10 600 2C700 14 800 74 900 98C1000 122 1100 110 1150 104L1200 98V134H1150C1100 134 1000 134 900 134C800 134 700 134 600 134C500 134 400 134 300 134C200 134 100 134 50 134H0V98Z' fill='%231681ee'/></svg>");}

@media(max-width:850px) {
  .wave-container::before {    
    height: 57px
  }  
}
</style>