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

const handleLogin = () => {
  errors.value = {}

  if (!email.value) {
    errors.value.email = 'Email is required'
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
  }

  if (Object.keys(errors.value).length === 0) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email.value && u.password === password.value)

    if (user) {
      alert('Login successful!')
      
      router.push('/watchList')
    } else {
      errors.value.email = 'Invalid email or password'
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