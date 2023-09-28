import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LocationView from "../views/LocationView.vue"

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/location/:state/:city',
      name: 'location',
      component: LocationView,
      meta: {
        title: "Weather"
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = 'Weather Advisor';
  next();
});

export default router
