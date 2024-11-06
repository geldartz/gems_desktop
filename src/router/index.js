import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const Home = () => import("@/views/Home.vue");
const Login = () => import("@/views/pages/Login.vue");
const Camera = () => import("@/views/Camera.vue");
const PrivacyPolicy = () => import("@/views/pages/Policy.vue");
const TermsCondition = () => import("@/views/pages/Terms.vue");

const Dashboard = () => import("@/views/Dashboard.vue");
const ClockIn = () => import("@/views/ClockIn.vue");
const ClockOut = () => import("@/views/ClockOut.vue");

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
      path: '/login',
      name: 'login',
      component: Login,
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
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicy,
      meta: {
          middleware: "guest",
      },
    },
    {
      path: '/terms-and-condition',
      name: 'terms-and-condition',
      component: TermsCondition,
      meta: {
          middleware: "guest",
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
          middleware: "auth",
      },
    },
    {
      path: '/clock-in',
      name: 'clockin',
      component: ClockIn,
      meta: {
          middleware: "guest",
      },
    },
    {
      path: '/clock-out',
      name: 'clockout',
      component: ClockOut,
      meta: {
          middleware: "guest",
      },
    },
  ]
})

export default router
