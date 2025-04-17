<template>  
    <div class="card film-card col-xs-12 col-sm-6 col-md-2 offset-1 my-3" >
      <router-link :to="`/movie/${film.id}`">
          <div class="card-img-container" >
            <img :src="`https://image.tmdb.org/t/p/w500/${film.poster_path}`" :alt="film.title"  class="card-img-top" />
          </div>
      </router-link>
      <div class="card-body">
        <h3 class="card-title">{{ film.title }}</h3>
        <p class="card-text">{{ film.release_date }}</p>
        <button @click="toggleWatchlist(film)" :class="{ 'in-watchlist': isInWatchlist(film.id) }">
          {{ isInWatchlist(film.id) ? '❤️ In Watchlist' : '♡ Add to Watchlist' }}
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref, } from 'vue'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { RouterLink } from 'vue-router'
const props = defineProps({
  film: {
    type: Object,
    required: true
  }
})

const watchlistStore = useWatchlistStore()



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
.film-card {
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.film-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.film-card .card-img-container {
  overflow: hidden;
  max-height: 300px;
  cursor: pointer;
}

.film-card img {
  width: 100%;
  object-fit: cover;
}

.film-card h3 {
  margin: 1rem 1rem 0.5rem;
  color: white;
  font-size: 1.1rem;
  min-height: 3rem;
}

.film-card p {
  margin: 0.5rem 1rem;
  color: #aaaaaa;
  min-height: 3rem;
}

button {
  width: calc(100% - 2rem);
  margin: 0 1rem 1rem;
  padding: 0.40rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}

button.in-watchlist {
  background: #2b1113;
}

button:hover {
  opacity: 0.9;
}
</style>