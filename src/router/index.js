import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const Home = () => import("@/views/Home.vue");
const Camera = () => import("@/views/Camera.vue");


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
          middleware: "guest",
      },
    },
    {
      path: '/app/camera',
      name: 'camera',
      component: Camera,
      meta: {
          middleware: "auth",
      },
    }
  ]
})

export default router
