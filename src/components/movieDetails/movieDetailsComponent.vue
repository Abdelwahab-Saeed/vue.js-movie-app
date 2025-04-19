<template>
  <div class="container py-5">
    <div v-if="store.movieData && store.movieData.title">
      <!-- Movie Header -->
      <div class="d-flex gap-4 flex-wrap">
        <!-- Poster -->
        <img
          :src="`https://image.tmdb.org/t/p/w500${store.movieData.poster_path}`"
          :alt="store.movieData.title"
          class="rounded shadow"
          style="max-width: 300px"
        />

        <!-- Info -->
        <div>
          <h1 class="mb-2">{{ store.movieData.title }}</h1>
          <p class="text-muted mb-1"><em>{{ store.movieData.tagline }}</em></p>
          <p><strong>Release Date:</strong> {{ store.movieData.release_date }}</p>
          <p><strong>Runtime:</strong> {{ store.movieData.runtime }} mins</p>
          <p><strong>Rating:</strong> {{ store.movieData.vote_average }} / 10 ({{ store.movieData.vote_count }} votes)</p>
          <p>
            <strong>Genres:</strong>
            <span v-for="genre in store.movieData.genres" :key="genre.id" class="badge bg-secondary me-1">
              {{ genre.name }}
            </span>
          </p>
          <p><strong>Status:</strong> {{ store.movieData.status }}</p>
          <p><strong>Languages:</strong>
            <span v-for="lang in store.movieData.spoken_languages" :key="lang.iso_639_1">
              {{ lang.english_name }}
              <span v-if="!isLast(store.movieData.spoken_languages, lang)">, </span>
            </span>
          </p>
        </div>
      </div>

      <!-- Overview -->
      <div class="mt-4">
        <h4>Overview</h4>
        <p>{{ store.movieData.overview }}</p>
      </div>

      <!-- Production Companies -->
      <div class="mt-4" v-if="store.movieData.production_companies.length">
        <h4>Production Companies</h4>
        <ul>
          <li v-for="company in store.movieData.production_companies" :key="company.id">
            {{ company.name }} ({{ company.origin_country }})
          </li>
        </ul>
      </div>

      <!-- Homepage Link -->
      <div v-if="store.movieData.homepage" class="mt-3">
        <a :href="store.movieData.homepage" target="_blank" class="btn btn-outline-primary">Visit Homepage</a>
      </div>
    </div>

    <!-- Loading or Empty State -->
    <div v-else>
      <p>Loading movie details...</p>
    </div>


    <!-- recommendation page -->
    <RecommendationComponent :movieId="movieId"/>

    <!-- comment section -->
    <commentSectionComponent :movieId="movieId" :movieComments="movieComments" @comment-added="loadMovieComments"/>

  </div>
</template>

<script setup>
  import { onMounted, ref, watch } from 'vue';
  import { useRequestStore } from './../../stores/requestStore.js';
  import { useRoute } from 'vue-router';
  import RecommendationComponent from './recommendationComponent.vue';
  import commentSectionComponent from './commentSectionComponent.vue';
  import CommentService from './CRUD_comment.js';

  const store = useRequestStore();
  const route = useRoute();
  let movieId = route.params.id;
  const movieComments = ref([]); //[CHANGE]

  // load movie comments [CHANGE]
  const loadMovieComments = async()=>{
    console.log("the movie id in load commments  = ", movieId);
    const result = await CommentService.getCommentsByMovie(movieId);
    movieComments.value = result || [];
  }

  //=============
  const loadMovieData = async (id) => {
    await store.fetchMovieDetails(id);
    await store.fetchRecommndedMovieList(id);
    await loadMovieComments();
    
  }

  // load the movie data
  onMounted(() => {loadMovieData(route.params.id)})

  // watch route changes: to change the conten
  watch(() => route.params.id, (newId, oldId) => { 
    if (newId !== oldId) {
      loadMovieData(newId)                             // load on change
      window.scrollTo({ top: 0, behavior: 'smooth' }); // to go to top
      movieId = newId;
    } })



  // Utility function to help with commas
  function isLast(array, item) {
    return array.indexOf(item) === array.length - 1;
  }

</script>

