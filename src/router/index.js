import { createRouter, createWebHistory } from 'vue-router'
import homeComponent from '@/components/homeComponent.vue';
import watchListComponent from '@/components/watchListComponent.vue';
import SearchComponent from '@/components/SearchComponent.vue';
import movieDetailsComponent from '@/components/movieDetails/movieDetailsComponent.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeComponent,
    },
    {
      path: '/watchList',
      name: 'watchList',
      component: watchListComponent
    },
    {
      path: '/search',
      name: 'search',
      component: SearchComponent
    },
    {
      path: '/movie/:id',
      name: 'movieDetails',
      component: movieDetailsComponent
    },
  ],
})

export default router
