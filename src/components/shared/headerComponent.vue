<template>
  <div class="header-container p-1 sticky-top">
    <nav class="container d-flex justify-content-between align-items-baseline py-2 text-dark">
      <router-link to="/" style="float: left;  text-decoration:none;" class="text-dark fs-6">Home</router-link>
      
      <div >
        <router-link to="/login" class="text-dark fs-6 me-4 head-links" v-if="isUserLoggedIn">
          Sign in <i class="fa-solid fa-right-to-bracket"></i>
        </router-link>
        <router-link to="/register" class="text-dark fs-6 me-4 head-links" v-if="isUserLoggedIn">
          Sign up <i class="fa-solid fa-user-plus"></i>
        </router-link>
        <router-link to="/login" class="text-dark fs-6 me-4 head-links" v-if="!isUserLoggedIn" @clcik="logOut">
          Logout <i class="fa-solid fa-right-from-bracket"></i>
        </router-link>
        <router-link to="/watchList" class="text-dark fs-6 head-links">
          <i class="fa-solid fa-heart"></i>
          Watchlist
          <span v-if="watchlistCount > 0" class="watchlist-counter">{{ watchlistCount }}</span>
        </router-link>
      </div>
    </nav>
  </div>


</template>

<script setup>
  import { ref } from 'vue';
  const isUserLoggedIn = ref(false);
  function checkLoggingStatus() {
    const userId = localStorage.getItem('loggedInUserId')
            if (!userId)
            {
              isUserLoggedIn.value = false;
            }
            else
            {
              isUserLoggedIn.value = true;
            }
  }

  function logOut() {
    localStorage.removeItem('loggedInUserId')
    isUserLoggedIn.value = false;
  }
</script>

<style scoped>
  .header-container{
    background-color: #FFE353;
    color: black;
    font-weight: bolder;
  }
  
  .head-links{
    text-decoration: none;
  }
</style>