import { defineStore } from 'pinia'
import { ref } from 'vue'

// Option 1: Using the setup syntax (recommended)
export const useRequestStore = defineStore('request', () => {
  
  // env variables
  const apiKey = import.meta.env.VITE_API_KEY
  const apiUrl = import.meta.env.VITE_API_URL

  // State (use refs)
  const allMovies = ref([]);
  const movieData = ref({}); // [SENU]
  const searchedMovies = ref([]);

  // Actions
  const fetchAllMovies = async (page = 1) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=6a1cabb5e93fd6605356ead9aa9712dd&language=en-US&page=${page}`)
      const data = await response.json()
      allMovies.value = data.results
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }
  

  const fetchSearchedMovies = async (query) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=6a1cabb5e93fd6605356ead9aa9712dd&language=en-US&query=${query}&page=1&include_adult=false`)
      const data = await response.json()
      searchedMovies.value = data.results
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  }

  const fetchMovieDetails = async (id) => {
    try {
      const url = `${apiUrl}movie/${id}?api_key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      movieData.value = data;
    } catch (err) { console.error("Error Fetching Movie Detail. Check internet.", err);}
  };
    
  
  

  return {
    allMovies,
    movieData, //[SENU]
    searchedMovies,
    fetchAllMovies,
    fetchMovieDetails, // [SENU]
    fetchSearchedMovies
  }
})
