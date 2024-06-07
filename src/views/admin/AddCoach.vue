
<template>
    <div class=" overflow-y-auto h-screen flex justify-center items-center">
      <div class="max-w-md w-full p-8 border  bg-white shadow-lg rounded-lg">
        <img src="/images/undraw_secure_login_pdn4.png" alt="Register" class="mx-auto mb-8">
        <h2 class="text-2xl font-bold text-primary-dark mb-4">Register a Coach</h2>
        <form @submit.prevent="register">
            <div class="mb-4">
            <label for="full name" class="block text-sm font-medium text-gray-700">Your full name</label>
            <input id="name" type="text" v-model="name" class="mt-1 block w-full rounded-md border-gray-300  border-2 shadow-sm  focus:ring focus:ring-primary-light focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input id="email" type="email" v-model="email" class="mt-1 block w-full rounded-md border-gray-300  border-2 shadow-sm  focus:ring focus:ring-primary-light focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" type="password" v-model="password" class="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm  focus:ring focus:ring-primary-light focus:ring-opacity-50">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-dark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Register</button>
     
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { registerUser, addUserToFirestore } from '@/firebase/FirebaseMethods';
  import { useMainStore } from "@/stores/MainStore.ts"
  import { useRouter } from 'vue-router';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const mainStore = useMainStore();
  const router = useRouter();
  
  const register = async () => {
    try {
      const userCredential = await registerUser(email.value, password.value);
      await addUserToFirestore(userCredential.uid, { email: email.value, id: userCredential.uid, name: name.value, role: 'coach' }); // Set role to 'coach'
      mainStore.user = userCredential;
    //   window.localStorage.setItem('#user', JSON.stringify(userCredential));
      console.log('Registration successful');
      router.push({ name: 'user-management' }); // Redirect to dashboard or home page upon successful registration
    } catch (error) {
      alert(error.message);
      console.error('Error during registration:', error);
      // Show error message to the user
    }
  };
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>
  