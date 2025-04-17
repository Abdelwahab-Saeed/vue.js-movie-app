<template>
  <main class="container-fluid">
    <h1 class="text-center">Popular Films</h1>
    <div class="row col-12">
      <cardComponent  v-for="film in films" :key="film.id" class="film-card" :film="film"/>
    </div>
    <div id="pagination" class="d-flex justify-content-center my-4">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">Previous</a>
          </li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from 'vue'
import { useWatchlistStore } from '@/stores/watchlistStore'
import cardComponent from './cardComponent.vue'
import { useRequestStore } from '@/stores/requestStore'

const watchlistStore = useWatchlistStore();
const requestStore = useRequestStore();
const films = computed(() => requestStore.allMovies)
onMounted(() => {
  requestStore.fetchAllMovies(4);
});


const toggleWatchlist = (film) => {
  if (isInWatchlist(film.id)) {
    watchlistStore.removeFromWatchlist(film.id)
  } else {
    watchlistStore.addToWatchlist(film)
  }
}

const isInWatchlist = (id) => {
  return watchlistStore.watchlist.some(item => item.id === id)
}
</script>

<style scoped>
</style>