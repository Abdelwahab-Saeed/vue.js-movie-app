<template>
  <div class="container p-5 w-60 border rounded-4 shadow bg-light-subtle text-dark">
    <div v-if="store.movieData && store.movieData.title">
      <!-- Movie Header -->
      <div class="d-flex gap-4 flex-wrap">
        <!-- Poster -->
        <img
          :src="`https://image.tmdb.org/t/p/w500${store.movieData.poster_path}`"
          :alt="store.movieData.title"
          class="rounded shadow-sm border"
          style="max-width: 300px"
        />

        <!-- Info -->
        <div class="flex-grow-1">
          <h1 class="mb-2 fs-1 fw-bold text-dark-emphasis">{{ store.movieData.title }}</h1>
          <p class="text-secondary fst-italic fs-5">{{ store.movieData.tagline }}</p>
          <p class="fs-5"><strong>Release Date:</strong> {{ store.movieData.release_date }}</p>
          <p class="fs-5"><strong>Runtime:</strong> {{ store.movieData.runtime }} mins</p>
          <p class="fs-5">
            <strong>Rating:</strong> {{ store.movieData.vote_average }} / 10
            ({{ store.movieData.vote_count }} votes)
          </p>
          <p class="fs-5">
            <strong>Genres:</strong>
            <span
              v-for="genre in store.movieData.genres"
              :key="genre.id"
              class="badge bg-primary-subtle text-primary-emphasis me-2"
            >
              {{ genre.name }}
            </span>
          </p>
          <p class="fs-5"><strong>Status:</strong> {{ store.movieData.status }}</p>
          <p class="fs-5"><strong>Languages:</strong>
            <span
              v-for="lang in store.movieData.spoken_languages"
              :key="lang.iso_639_1"
            >
              {{ lang.english_name }}
              <span v-if="!isLast(store.movieData.spoken_languages, lang)">, </span>
            </span>
          </p>
        </div>
      </div>

      <!-- Overview -->
      <div class="mt-5 p-4 bg-white border rounded-3 shadow-sm">
        <h3 class="text-primary mb-3">Overview</h3>
        <p class="fs-5 text-body">{{ store.movieData.overview }}</p>
      </div>

      <!-- Production Companies -->
      <div class="mt-4" v-if="store.movieData.production_companies.length">
        <h4 class="text-secondary">Production Companies</h4>
        <ul class="fs-5">
          <li
            v-for="company in store.movieData.production_companies"
            :key="company.id"
          >
            {{ company.name }} ({{ company.origin_country }})
          </li>
        </ul>
      </div>

      <!-- Homepage Link -->
      <div v-if="store.movieData.homepage" class="mt-4">
        <a
          :href="store.movieData.homepage"
          target="_blank"
          class="btn btn-primary btn-lg mt-2"
        >
          Visit Homepage
        </a>
      </div>
    </div>

    <!-- Loading or Empty State -->
    <div v-else class="text-center mt-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-3 fs-4 text-dark-emphasis">Loading movie details...</p>
    </div>

    <!-- Recommendation -->
    <div class="mt-5">
      <RecommendationComponent :movieId="movieId" />
    </div>

    <!-- Comment Section -->
    <div class="mt-5">
      <commentSectionComponent
        :movieId="movieId"
        :movieComments="movieComments"
        @comment-added="loadMovieComments"
      />
    </div>
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
const movieComments = ref([]);

const loadMovieComments = async () => {
  const result = await CommentService.getCommentsByMovie(movieId);
  movieComments.value = result || [];
};

const loadMovieData = async (id) => {
  await store.fetchMovieDetails(id);
  await store.fetchRecommndedMovieList(id);
  await loadMovieComments();
};

onMounted(() => {
  loadMovieData(route.params.id);
});

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      loadMovieData(newId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      movieId = newId;
    }
  }
);

function isLast(array, item) {
  return array.indexOf(item) === array.length - 1;
}
</script>

<style>
.w-60 {
  width: 85%;
  max-width: 1100px;
}
@media (max-width: 768px) {
  .w-60 {
    width: 100% !important;
  }
}
</style>
