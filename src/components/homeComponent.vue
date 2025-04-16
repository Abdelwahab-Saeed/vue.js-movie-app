<template>
  <div class="home">
    <h1>Popular Films</h1>
    <div class="film-grid">
      <div v-for="film in films" :key="film.id" class="film-card">
        <img :src="film.poster" :alt="film.title" @error="handleImageError">
        <h3>{{ film.title }}</h3>
        <p>⭐ {{ film.rating }} ({{ film.year }})</p>
        <p class="genre">{{ film.genre.join(', ') }}</p>
        <button 
          @click="toggleWatchlist(film)"
          :class="{ 'in-watchlist': isInWatchlist(film.id) }"
        >
          {{ isInWatchlist(film.id) ? '❤️ In Watchlist' : '♡ Add to Watchlist' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useWatchlistStore } from '@/stores/watchlistStore'

const films = ref([
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: ["Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX600_.jpg",
    description: "Two imprisoned men bond over a number of years..."
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    genre: ["Crime", "Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX600_.jpg",
    description: "The aging patriarch of an organized crime dynasty..."
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: ["Action", "Crime", "Drama"],
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX600_.jpg",
    description: "When the menace known as the Joker wreaks havoc..."
  }
])

const watchlistStore = useWatchlistStore()

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300x450?text=Poster+Not+Available'
}

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
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.film-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

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

.film-card img {
  width: 100%;
  height: 375px;
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
}

.film-card .genre {
  color: #f5c518;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

button {
  width: calc(100% - 2rem);
  margin: 0 1rem 1rem;
  padding: 0.75rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

button.in-watchlist {
  background: #e50914;
}

button:hover {
  opacity: 0.9;
}
</style>