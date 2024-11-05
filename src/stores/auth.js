import { defineStore } from 'pinia'
import router from '@/router/index'
import axios from 'axios';


export const userAuthStore = defineStore('userAuth', {
    state: () => ({
        authenticated: false,
        user: {},
    }),

    getters: {
        getUser: (state) => state.user,
        getAuthentition: (state) => state.authenticated
    },

    actions: {
        async getToken() {
            await axios.get("/sunctum/csrf-cookie");
        },
        redirect(){
            router.push({name:'dashboard'});
        },
        async signOut(){
            this.authenticated = false
            this.user = {}
            router.push({name:'login'});
        },
    },
    persist: true,
});