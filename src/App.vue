<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useWatchlistStore } from './stores/watchlistStore'
import { storeToRefs } from 'pinia'
import {ref, computed, onMounted } from 'vue'
import searchForm from './components/Search/SearchForm.vue';
import HeaderComponent from './components/shared/headerComponent.vue';
import FooterComponent from './components/shared/footerComponent.vue';
import { useRouter } from 'vue-router'

const watchlistStore = useWatchlistStore()
const { watchlist } = storeToRefs(watchlistStore)

const watchlistCount = computed(() => {
  return watchlist.value.length
})
const isLoggedIn = ref(!!localStorage.getItem('loggedInUserId'))
onMounted(() => {
  console.log('Initial watchlist:', watchlist.value)
})
const logout = () => {
  localStorage.removeItem('loggedInUserId')
  isLoggedIn.value = false
  router.push('/')
}
const router = useRouter()
router.beforeEach((to) => {
  if (to.path == '/watchList' && !localStorage.getItem('loggedInUserId')) {
    return '/login'
  }
})

onMounted(() => {
  console.log('Initial watchlist:', watchlist.value)
})

</script>


<template>
<!-- <HeaderComponent :isLoggedIn="isLoggedIn" :logout="logout" /> -->
<HeaderComponent :isLoggedIn="isLoggedIn" :logout="logout" />
 

</template>

<style scoped>

</style>
