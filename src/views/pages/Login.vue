<template>
    <div class="flex justify-center items-center w-full h-full">
        <div class="bg-[#ffffffee] w-[650px] p-[50px] border border-gray-300 shadow-sm rounded-md" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1500">    
          <div class="relative">
            <h2 class="h-24 text-center font-bold text-3xl text-emsBlue" >ADMIN LOGIN</h2>
            <form @submit.prevent="handleLogin" @keydown="form.onKeydown($event)" class="space-y-6 relative">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email Address</label>
                <div class="mt-2">
                  <input v-model="form.email" id="email" name="email" type="email" 
                  class="text-sm text-gray-600 sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none p-2" :class="[ form.errors.has('password') ? 'border-red-500': 'border-grey-500'] " />
                  <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" v-if="form.errors.has('email')">{{ form.errors.get('email') }}</span>
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="mt-2">
                  <input  v-model="form.password" id="password" name="password" type="password" 
                  class="text-sm text-gray-600 sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none p-2" :class="[ form.errors.has('password') ? 'border-red-500': 'border-grey-500'] " />
                  <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" v-if="form.errors.has('password')">{{ form.errors.get('password') }}</span>
                </div>
              </div>
              <p class="my-2 text-gray-500 text-sm">By logging-in you agree to our <RouterLink class="text-emsBlue" to="/privacy-policy">Privacy Policy</RouterLink>  and <RouterLink class="text-emsBlue" to="/terms-and-condition">Terms of Use</RouterLink></p>
              <SolidButton :isLoading="form.busy" label="Login" :icon="LockClosedIcon"></SolidButton>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-emsBlue focus:ring-blue-600" />
                  <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-700">Remember me</label>
                </div>
                <div class="text-sm leading-6">
                  <a href="#" class="font-semibold text-emsBlue hover:text-blue-500">Forgot password?</a>
                </div>
              </div>
              <small class="text-gray-400 absolute bottom-[-25px] left-0">Device ID: {{ form.uuid }}</small>
            </form>
           
          </div>

        
        </div>
        <!-- <div class="wave-container"></div> -->
  
    </div>
  </template>

  <script setup>
  import { reactive, ref, onMounted } from 'vue';
  import Form from 'vform'

//   import {siteSettings} from '@/store/utils';
  import {userAuthStore} from '@/stores/auth';
//   import { successMessage, errorMessage } from "@/utilities/toast.js";
  import SolidButton from '@/components/buttons/SolidButton.vue';
  import { LockClosedIcon } from '@heroicons/vue/24/outline';
  import { successMessage, errorMessage } from "@/utils/toast.js";

    const form = reactive(new Form({
        email: '',
        password: '',
        uuid: '',
    }));

    const processing = ref(false)



    function handleLogin(){
      axios.get(import.meta.env.VITE_API_URL+'/sanctum/csrf-cookie').then(response => {
        form.post(import.meta.env.VITE_API_URL+"/login").then((data) => {
          console.log(data)
            if(data.data.success){
              userAuthStore().authenticated = true
              userAuthStore().user = data.data.data
              userAuthStore().redirect();
            }else{
              errorMessage("Oops!", "These credentials do not match our records.", "top-right");
            }
          })
          .catch(({ response }) => {
            errorMessage("Oops!", "These credentials do not match our records.", "top-right");
          })
          .finally(() => {
          });
      });
                 
    }

    onMounted(async () => {
    if (window.electronAPI && typeof window.electronAPI.getUUID === 'function') {
      form.uuid = await window.electronAPI.getUUID();
  
    }
  });
 
   

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