<template>
    <div class=" h-screen flex justify-center items-start">
      <div class=" w-full p-8 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold text-primary-dark mb-4">Select a Coach</h2>
        <div class="flex  flex-col justify-center gap-2">
          <div v-for="coach in coaches" :key="coach.id" class="flex flex-col" >
        
            <div class="flex items-center bg-gray-100 justify-between rounded-md p-4 w-full md:w-auto mb-4 md:mb-0 md:mr-4">
            <!-- Coach Avatar -->
            <div class="flex-shrink-0 w-12 h-12 bg-primary-light rounded-full flex items-center justify-between">
              <!-- Random icon from SVG -->
              <!-- <img :src="coach.avatar" alt="Coach Avatar" class="w-8 h-8" /> -->
            </div>
            <!-- Coach Name -->
            <div class="ml-4">{{ coach.name }}</div>
            <!-- Select Button -->
        <div class="flex flex-row-reverse gap-4 ">
            <button @click="selectCoach(coach.id)" class="px-4 py-2 bg-primary-dark text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary">
            {{  showResult(coach.id)}}
            </button>
            <button v-if="showResult(coach.id)=='Sent'" @click="cancelCoach(coach.id)" class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary">
            cancel
            </button>
        </div>
      
          </div>
          
        </div>
        
                
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { deleteDocument, getCollection,getDocument,setDocument } from '@/firebase/FirebaseMethods'; // Assuming you have a method to fetch coaches from Firebase
  import { useRouter } from 'vue-router';
  import { useMainStore } from '@/stores/MainStore';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
  const coaches = ref([]); // Array to hold the list of coaches
  const router = useRouter();
  const mainStore = useMainStore()
  const requestList = ref([])
  // Fetch coaches from Firebase on component mount
  onMounted(async () => {

    console.log(mainStore.user,'why')
    const getRequest = await getCollection('requests')
     getRequest.forEach((object:Array<object>)=>{
         requestList.value.push({coachId:object.coachId,userId:object.id});
    })
   const coachesData = await getCollection('users'); // Fetch coaches data from Firebase
   coaches.value = coachesData.filter(coach => coach.role === 'coach');
  });
  
  const showResult = (id: string) => {
  
    const isSent = requestList.value.some((object) => {
      console.log(object.userId === mainStore.user.uid,mainStore.user.uid,object.userId)
      return object.userId === mainStore.user.uid
    });
  return isSent ? 'Sent' : 'Select';
};
  // Function to select a coach
  const selectCoach = async (coach: any) => {
    // Redirect to another page or perform action with selected coach
    const add =await addDoc(collection(db, 'requests'), {id:mainStore.user.uid,email:mainStore.user.email,coachId:coach});
    console.log(add,'d')
    requestList.value = []
    const getRequest = await getCollection('requests')
 getRequest.forEach((object:Array<object>)=>{
         requestList.value.push({coachId:object.coachId});
    })
    // Example: Redirect to coach profile page
    // router.push({ name: 'coach-profile', params: { coachId: coach.id } });
  };

const cancelCoach = async (coach:any)=>{
    requestList.value = []
    const requests = await getCollection('requests')
    requests.forEach(async(o:any)=>{
      if(o.coachId === coach){
        await deleteDocument('requests',o.documentId)
      }
    })
    const response = await getCollection('responses')
    response.forEach(async(o:any)=>{
   
      console.log(o.coachId === coach,'test',o.coachId,coach)
      if(o.coachId === coach){
        console.log(o.documentId === coach,'test')
        await deleteDocument('responses',o.documentId)
      }
    })
  
 const getRequest = await getCollection('requests')
 getRequest.forEach((object:Array<object>)=>{
         requestList.value.push({coachId:object.coachId});
    })
}
  </script>
  
  <style>
  /* Add any additional styles here */
  </style>
  