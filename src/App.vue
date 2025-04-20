<script setup>
import headerComponent from './components/shared/headerComponent.vue';
import footerComponent from './components/shared/footerComponent.vue';
import { RouterLink, RouterView } from 'vue-router';
import { useWatchlistStore } from './stores/watchlistStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import searchForm from './components/Search/SearchForm.vue';
import { useRouter } from 'vue-router'
import * as bootstrap from 'bootstrap';

const watchlistStore = useWatchlistStore()
const { watchlist } = storeToRefs(watchlistStore)

const watchlistCount = computed(() => {
  return watchlist.value.length
})

const router = useRouter()
router.beforeEach((to) => {
  if (to.path === '/watchList' && !localStorage.getItem('loggedInUserId')) {
    return '/login'
  }
})

onMounted(() => {
  console.log('Initial watchlist:', watchlist.value)
})

</script>


<template>

  <div>
    <header-component></header-component>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<style scoped>

</style>
