<template>
  <div class="data container-fluid">
    <nav
      style="padding: 20px; background-color: #FFE353; margin: 0;"
      class="d-flex justify-content-between align-items-baseline p-1 text-dark"
    >
      <router-link to="/" class="text-dark fs-6" style="text-decoration: none;">Home</router-link>

      <div>
        <router-link
          v-if="!isLoggedIn"
          to="/register"
          class="text-dark fs-6 me-4"
          style="text-decoration: none;"
        >Sign Up</router-link>

        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="text-dark fs-6 me-4"
          style="text-decoration: none;"
        >Login</router-link>

        <button
          v-if="isLoggedIn"
          @click="logout"
          class="btn btn-sm btn-outline-dark me-4"
        >Logout</button>

        <router-link
          to="/watchList"
          class="text-dark fs-6"
          style="position: relative; text-decoration: none;"
        >
          ❤️ Watchlist
          <span v-if="watchlistCount > 0" class="watchlist-counter">{{ watchlistCount }}</span>
        </router-link>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

  
  <script setup>
defineProps({
  isLoggedIn: Boolean,
  logout: Function
})
  </script>
  
  <style scoped>
  
  </style>