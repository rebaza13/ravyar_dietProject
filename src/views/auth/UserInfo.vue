<template>
    <div class="bg-primary-light h-screen  flex justify-center items-center">
      <div class="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
     
        <h2 class="text-2xl font-bold text-primary-dark mb-4">Update Your Profile</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
            <input id="age" type="number" v-model="age" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
            <select id="gender" v-model="gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="weight" class="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input id="weight" type="number" v-model="weight" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50">
          </div>
          <div class="mb-4">
            <label for="height" class="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input id="height" type="number" v-model="height" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50">
          </div>
          <div class="flex items-center justify-between">
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-dark hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/MainStore';
  import { updateDocument } from '@/firebase/FirebaseMethods';
  
  const age = ref('');
  const gender = ref('');
  const weight = ref('');
  const height = ref('');
  import { useRouter } from 'vue-router';


  const router = useRouter()
  const submitForm = async () => {
    try {
      const userStore = useMainStore();
      const userId = userStore.user?.uid;
      if (userId) {
        await updateDocument('users',userId, {
          age: age.value,
          gender: gender.value,
          weight: weight.value,
          height: height.value
        });
        alert('Profile updated successfully')
        router.push({name:'home'})
        console.log('Profile updated successfully');
        // Optionally, you can redirect the user or show a success message
      }
    } catch (error) {
      alert(error.message)
      console.error('Error updating profile:', error);
      // Show error message to the user
    }
  };
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>
  