import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useMainStore = defineStore('mainStore',()=>{
    const user = ref(JSON.parse(window.localStorage.getItem("#user")))
    // const userString = window.localStorage.getItem('#user');
    // const user = userString ? JSON.parse(userString) : null;

    

        return {user}
})