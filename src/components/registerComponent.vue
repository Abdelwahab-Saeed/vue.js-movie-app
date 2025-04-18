<template>
    <div>
        <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h3>Register</h3>
          </div>
          <div class="card-body">
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

              <!-- Email -->
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

              <button type="submit" class="btn w-100">Register</button>
            </form>
            <div class="text-center mt-3">
  <router-link to="/login" class="text-dark text-decoration-none">
    Already have an account?
    <span class="ms-2 btn">sign in</span>
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

const name = ref('')
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const errors = ref({})

const submitForm = () => {
  errors.value = {}

 
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
    const user = {
      name: name.value,
      email: email.value,
      password: password.value
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))

    alert('Registration successful!')

    name.value = ''
    email.value = ''
    password.value = ''
    repeatPassword.value = ''
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