<template>
  <div class="py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card shadow-lg">
              <div class="card-header text-center bg-white">
                <h3>Login</h3>
              </div>
              <div class="card-body">
                  <div
                  v-if="alert.message && alert.type === 'success'"
                  class="alert alert-success"
                  role="alert"
                >
                  {{ alert.message }}
                </div>
                <div
                  v-if="alert.message && alert.type === 'error'"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ alert.message }}
                </div>
                <form @submit.prevent="handleLogin">
               
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                      v-model="email"
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors.email }"
                    />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                  </div>
  
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      :class="{ 'is-invalid': errors.password }"
                    />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                  </div>
  
                  <button type="submit" class="btn w-100">Login</button>
                </form>
  
                <div class="text-center mt-3">
                  <router-link to="/register" class="text-dark text-decoration-none">
                    Don't have an account? Register
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const errors = ref({})
  const alert = ref({ message: '', type: '' }) 
  
  const handleLogin = async () => {
    errors.value = {}
    alert.value = { message: '', type: '' }
  
    // check empty email and password
    if (!email.value) errors.value.email = 'Email is required'
    if (!password.value) errors.value.password = 'Password is required'
  
    if (Object.keys(errors.value).length === 0) {
  
      // get user data
      const res = await fetch(`http://localhost:3000/users?email=${email.value}&password=${password.value}`)
      const users = await res.json()
  
      if (users.length > 0) {
  
        // set user id in the local storage
        localStorage.setItem('loggedInUserId', users[0].id)
        alert.value = { message: 'Login successful!', type: 'success' }
        setTimeout(() => router.push('/'), 1000);
      } else {
        alert.value = { message: 'Invalid email or password.', type: 'error' }
      }
    }
  }
  </script>
  
  <style scoped>
  .btn{
    background-color: rgb(255, 229, 248);
   
  }
  .btn:hover{
      background-color: rgb(255, 165, 231);
  }
  
  </style>