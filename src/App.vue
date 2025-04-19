<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useWatchlistStore } from './stores/watchlistStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import searchForm from './components/Search/SearchForm.vue';
import HeaderComponent from './components/shared/headerComponent.vue';
import FooterComponent from './components/shared/footerComponent.vue';
import { useRouter } from 'vue-router'

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
<HeaderComponent/>

</template>

<style scoped>

</style>
