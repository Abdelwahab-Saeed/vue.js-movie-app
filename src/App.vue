<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useWatchlistStore } from './stores/watchlistStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import searchForm from './components/Search/SearchForm.vue';
const watchlistStore = useWatchlistStore()
const { watchlist } = storeToRefs(watchlistStore)

const watchlistCount = computed(() => {
  return watchlist.value.length
})



onMounted(() => {
  console.log('Initial watchlist:', watchlist.value)
})
</script>


<template>

  <div class="data container-fluid">
    <nav style="padding: 20px; background-color:rgb(255, 229, 248); margin:0;" class="d-flex justify-content-between align-items-baseline p-1 text-dark">
      <router-link to="/" style="float: left;  text-decoration:none;" class="text-dark fs-6">Home</router-link>
      
      <div style="float: right;">
        <router-link to="/register" style="float: left;  text-decoration:none;" class="text-dark fs-6 me-4">sign up</router-link>
        <router-link to="/watchList" style="margin-right: 20px; position: relative; text-decoration:none;" class="text-dark fs-6">
          ❤️Watchlist
          <span v-if="watchlistCount > 0" class="watchlist-counter">{{ watchlistCount }}</span>
        </router-link>
      </div>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
