<template>
  <div class="h-screen flex justify-center items-start">
    <div class="w-full p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-primary-dark mb-4">my courses</h2>
      <div class="flex flex-col justify-center gap-2">
        <div class="flex flex-col gap-5">
          
          <div  v-for="i in mixed" :key="i" class="">
            <div 
              class="flex items-center bg-gray-100 justify-between rounded-md p-4 w-full md:w-auto mb-4 md:mb-0 md:mr-4"
            >
              <!-- Coach Avatar -->
              <div
                class="flex-shrink-0 w-12 h-12 bg-primary-light rounded-full flex items-center justify-between"
              >
                <!-- Random icon from SVG -->
                <!-- <img :src="coach.avatar" alt="Coach Avatar" class="w-8 h-8" /> -->
              </div>
              <!-- Coach Name -->
              <div class="ml-4">
                {{ i.users.name  }}
              </div>
           
            </div>
            <!-- section -->
            <section
              class="rounded-md p-4 w-full md:w-auto mb-4 md:mb-0 md:mr-4 mt-6"
            >
         
        
              <div v-for="course in i.responses" :key="course.id">
                <div class="bg-gray-100 p-4 rounded-md shadow-md mb-4">
                  <h3 class="text-xl font-bold text-primary-dark mb-2">
                    {{ course.title }}
                  </h3>
                  <p class="text-gray-700 mb-2">{{ course.description }}</p>
                  <a
                    :href="course.link"
                    target="_blank"
                    class="text-blue-500 underline hover:text-blue-700"
                    >{{ course.link }}</a
                  >
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  getCollection,
  setDocument,
  getDocument,
  getDocumentsByQuery,
  getSingleDocumentByQuery,
} from "@/firebase/FirebaseMethods"; // Assuming you have a method to fetch coaches from Firebase
import {
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";

import { useRouter } from "vue-router";
// import { query, where,getDocs, collection } from 'firebase/firestore';
import { useMainStore } from "@/stores/MainStore";
import { db } from "@/firebase/firebase";

const coursesDetail = ref([])
const coursesCoach = ref([])
const coachIds = ref([])
const mainStore = useMainStore()
const mixed = ref([])
onMounted(async ()=>{
  let mix :any =[]
  let course :any = []
  let coaches :any= []
  const getCourses = await getDocumentsByQuery('responses','id',mainStore.user.uid)
  coursesCoach.value = getCourses.forEach( async(o:any) =>{
    if(o){
      console.log('hererere',o.coachId)
      coachIds.value.push(o.coachId)
      const responses = o.responses
      console.log(responses[0],'test')
      course.push ({responses,coachId:o.coachId})
      const users = await getSingleDocumentByQuery('users','id',o.coachId)
      coaches.push(users)
      mix.push({responses,coachId:o.coachId,users})
      console.log(mix)
      }
    
      })
      
   setTimeout(()=>{
    coursesCoach.value = course
    coursesDetail.value = coaches
    mixed.value = mix
   },2000)
 

})

</script>

<style>
/* Add any additional styles here */
</style>
