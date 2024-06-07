<!-- src/views/Login.vue -->
<template>
    <div class="bg-primary-light h-screen flex justify-center items-center">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <img src="/images/undraw_secure_login_pdn4.png" alt="Login" class="mx-auto mb-8">
        <h2 class="text-2xl font-bold text-primary-dark mb-4">Login to Diet Coach</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input id="email" type="email" v-model="email" class="mt-1 border-2 block w-full rounded-md border-gray-300 shadow-sm  focus:ring focus:ring-primary-light focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" v-model="password" class="mt-1 block border-2 w-full rounded-md border-gray-300 shadow-sm  focus:ring focus:ring-primary-light focus:ring-opacity-50">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-dark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Login</button>
            <router-link to="/register" class="text-sm font-medium text-primary-dark hover:text-primary">Create an account</router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang ="ts">
  import { ref } from 'vue';
  import { loginUser } from '@/firebase/FirebaseMethods';
  import {RouterLink} from "vue-router"
  import { useRouter } from 'vue-router';
      const email = ref('');
      const password = ref('');
      const router = useRouter()
      const login = async () => {
        try {
          await loginUser(email.value, password.value);
          // Redirect to dashboard or home page upon successful login
          router.push({name: 'home'})
          console.log('Login successful');
        } catch (error:any) {
          alert(error.message)
          console.error('Error during login:', error);
          // Show error message to the user
        }
      };
  
    
    
  
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>
  