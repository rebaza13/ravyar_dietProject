<template>
    <div class="h-screen flex justify-center items-start p-8 bg-primary-light">
      <div class="w-full bg-white shadow-lg rounded-lg p-8">
        <h2 class="text-2xl font-bold text-primary-dark mb-4">Select a Coach</h2>
        <div class="flex flex-col justify-center gap-2">
          <div v-for="(user, index) in userRequests" :key="user.id" class="bg-gray-100 rounded-md p-4 mb-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <!-- Random icon from SVG -->
                  <!-- <img :src="user.avatar" alt="User Avatar" class="w-8 h-8" /> -->
                </div>
                <div class="ml-4">{{ user.email }}</div>
              </div>
              <button @click="respondToUser(index)" class="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary">
                Respond
              </button>
            </div>
            <div v-if="responseForms[index]" class="mt-4 p-4 border rounded-md">
              <div v-for="(response, idx) in responseForms[index]" :key="idx" class="mb-4">
                <input v-model="response.title" type="text" placeholder="Title" class="block w-full mb-2 rounded-md border-gray-300 border-2 shadow-sm focus:ring focus:ring-primary-light focus:ring-opacity-50" />
                <textarea v-model="response.description" placeholder="Description" class="block w-full mb-2 rounded-md border-gray-300 border-2 shadow-sm focus:ring focus:ring-primary-light focus:ring-opacity-50"></textarea>
                <input v-model="response.link" type="text" placeholder="Link" class="block w-full mb-2 rounded-md border-gray-300 border-2 shadow-sm focus:ring focus:ring-primary-light focus:ring-opacity-50" />
              </div>
              <button @click="addResponseForm(index)" class="mb-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary">Add More</button>
              <button @click="submitResponse(index, user.id,user.coachId)" class="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getCollection, setDocument, setDocumentWithRandomId } from '@/firebase/FirebaseMethods';
  import { db } from '@/firebase/firebase';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  import { useRouter } from 'vue-router';
  import { useMainStore } from '@/stores/MainStore';
  
  const userRequests = ref([]); // Array to hold the list of coaches
  const responseForms = ref<{ title: string; description: string; link: string }[][]>([]);
  const router = useRouter();
  const mainStore = useMainStore();
  
  // Fetch coaches from Firebase on component mount
  onMounted(async () => {
    const requestRef = collection(db, 'requests');
    const q = query(requestRef, where('coachId', '==', mainStore.user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      userRequests.value.push({ id: doc.id, ...doc.data() });
      responseForms.value.push([{ title: '', description: '', link: '' }]); // Initialize response forms for each user request
    });
  });
  
  // Function to show response form for a user
  const respondToUser = (index: number) => {
    responseForms.value[index].push({ title: '', description: '', link: '' });
  };
  
  // Function to add more response fields
  const addResponseForm = (index: number) => {
    responseForms.value[index].push({ title: '', description: '', link: '' });
  };
  
  // Function to submit the response
  const submitResponse = async (index: number, userId: string,coachId:string) => {
    try {
      const responses = responseForms.value[index];
      await setDocumentWithRandomId('responses', { responses, coachId: mainStore.user.uid,id:userId });
      alert('Response submitted successfully');
    } catch (error) {
      console.error('Error submitting response:', error);
      alert('Error submitting response');
    }
  };
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>
  