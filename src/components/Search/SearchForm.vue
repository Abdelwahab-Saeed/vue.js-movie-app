<template>
  <form class="d-flex" role="search" @submit.prevent="submitSearch">
    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="inputValue">
    <router-link :to="{ path: '/search', query: { query: inputValue }}" class="btn submit-btn">
        Search
    </router-link>
</form>
</template>"

<script setup>
    import { RouterLink, RouterView } from 'vue-router';
    import { ref } from 'vue'
    const inputValue = ref('');

   
</script>

<style scoped>
    .submit-btn {
        background-color:  #FFE353;
        color: black;
    }
</style>