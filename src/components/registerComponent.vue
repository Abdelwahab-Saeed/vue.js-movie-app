<template>
    <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h3>Register</h3>
          </div>
          <div class="card-body">
          
            <div
              v-if="showAlert"
              class="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {{ successMessage }}
              <button
                type="button"
                class="btn-close"
                @click="showAlert = false"
              ></button>
            </div>
            <form @submit.prevent="submitForm" novalidate>
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  v-model="name"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.name }"
                />
                <div class="invalid-feedback">{{ errors.name }}</div>
              </div>

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

              <div class="mb-3">
                <label class="form-label">Repeat Password</label>
                <input
                  v-model="repeatPassword"
                  type="password"
                  class="form-control"
                  :class="{ 'is-invalid': errors.repeatPassword }"
                />
                <div class="invalid-feedback">{{ errors.repeatPassword }}</div>
              </div>

              <button type="submit" class="btn w-100">
                Register
              </button>
            </form>

            <!-- Link to Login -->
            <div class="text-center mt-3">
              <router-link
                to="/login"
                class="text-dark text-decoration-none"
              >
                Already have an account?
                <span class="ms-2 btn  px-3">Sign in</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const errors = ref({})
const successMessage = ref('')
const showAlert = ref(false)

const submitForm = async () => {
  errors.value = {}
  showAlert.value = false
  successMessage.value = ''

  if (!name.value) errors.value.name = 'Name is required'
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = 'Invalid email address'
  }
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }
  if (!repeatPassword.value) {
    errors.value.repeatPassword = 'Please repeat your password'
  } else if (repeatPassword.value !== password.value) {
    errors.value.repeatPassword = 'Passwords do not match'
  }

  if (Object.keys(errors.value).length === 0) {
    
    const res = await fetch(`http://localhost:3000/users?email=${email.value}`)
    const existing = await res.json()
    if (existing.length > 0) {
      errors.value.email = 'Email already exists'
      return
    }

    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        watchlist: [] 
      })
    })

    if (response.ok) {
      successMessage.value = 'Registration successful!'
      showAlert.value = true
      name.value = ''
      email.value = ''
      password.value = ''
      repeatPassword.value = ''
    }
  }
}
  </script>
  
  <style scoped>
  .btn{
    background-color: #FFE353;
  }
  .btn:hover{
    background-color: #bea213;
  }
  </style>