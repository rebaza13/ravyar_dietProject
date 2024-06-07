<!-- src/views/Register.vue -->
<template>
    <div class="bg-primary-light overflow-y-auto h-screen flex justify-center items-center">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
        <img src="/images/undraw_secure_login_pdn4.png" alt="Register" class="mx-auto mb-8">
        <h2 class="text-2xl font-bold text-primary-dark mb-4">Create an Account</h2>
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
            <router-link to="/login" class="text-sm font-medium text-primary-dark hover:text-primary">Login</router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { registerUser, addUserToFirestore, getCollection } from '@/firebase/FirebaseMethods';
  import {useMainStore} from "@/stores/MainStore.ts"
  import { useRouter } from 'vue-router';
  import {auth} from "@/firebase/firebase";
  import { updateProfile } from 'firebase/auth';
      const name = ref('')
      const email = ref('');
      const password = ref('');
      const mainStore = useMainStore()
      const router = useRouter()
      const register = async () => {
        try {
          const userCredential = await registerUser(email.value, password.value);
          await addUserToFirestore(userCredential.uid, { email: email.value,id: userCredential.uid,name:name.value,role:'user'});

          let selectedRole 
     const collectUser = await getCollection('users')
     collectUser.forEach((object:any)=>{
      if(object.id === userCredential.uid ){
        selectedRole =object.role
      }})
          mainStore.user = {
            role: selectedRole,
        name:userCredential.displayName,
        email:userCredential.email,
        photo:userCredential.photoURL,
        uid: userCredential.uid  
      }
          console.log(mainStore.user,'here and there')
          window.localStorage.setItem('#user',JSON.stringify(mainStore.user))
          console.log('Registration successful');
          // Redirect to dashboard or home page upon successful registration
          updateProfile(auth.currentUser, {
  displayName: name.value 
}).then(() => {
  mainStore.user.displayName = name.value;
  console.log(mainStore.user,'here and there')
window.localStorage.setItem('#user', JSON.stringify(mainStore.user));

}).catch((error) => {
  // An error occurred
  // ...
});
          router.push({name:'user-info'})
        } catch (error:any) {
          alert(error.message)
          console.error('Error during registration:', error);
          // Show error message to the user
        }
      };
  
  
     

  
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>
  