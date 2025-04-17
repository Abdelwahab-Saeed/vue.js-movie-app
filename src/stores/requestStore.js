import { defineStore } from 'pinia'
import { env } from '../../.env'
import { ref } from 'vue'
// Option 1: Using the setup syntax (recommended)
export const useRequestStore = defineStore('request', () => {
  // State (use refs)
  const allMovies = ref([]);
  const movieData = ref({}); // [SENU]
  const searchedMovies = ref([]);

  // Actions
  const fetchAllMovies = async () => {
    try {
      const response = await fetch(`${env.url}movie/now_playing?api_key=${env.apiKey}&language=en-US&page=1`)
      const data = await response.json()
      allMovies.value = data.results
      console.log("all movies data = ", allMovies.value);
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const fetchSearchedMovies = async (query) => {
    try {
      const response = await fetch(`${env.url}search/movie?api_key=${env.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`)
      const data = await response.json()
      searchedMovies.value = data.results
    } catch (error) {
      console.error('Error searching movies:', error)
    }
  }

  
  const fetchMovieDetails = async(id)=>{
    try{ // [SENU]
      const response = await fetch(`${env.url}movie/${id}?api_key=${env.apiKey}`)
      movieData.value = await response.json();
    } catch(err){console.error("Erro Fetching Movie Detail. check internet.")}
  }

  return {
    allMovies,
    searchedMovies,
    fetchAllMovies,
    fetchMovieDetails, //[SENU]
    fetchSearchedMovies
  }
})