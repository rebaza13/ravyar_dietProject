import { createRouter , createWebHistory,RouteRecordRaw } from "vue-router";
import { useMainStore } from "@/stores/MainStore";
const Home : Array<RouteRecordRaw> =[
    {
        path: "profile",
        name: "profile",
        component: ()=>import("@/views/home/Profile.vue")
    },
    {
        path: "request",
        name: "request",
        component: ()=>import("@/views/home/Request.vue")
    },
    {
        path: "response",
        name: "response",
        component: ()=>import("@/views/home/Response.vue")
    },
    {
        path: "courses",
        name: "courses",
        component: ()=>import("@/views/home/Courses.vue")
    },
    {
        path: "user-management",
        name: "user-management",
        component: ()=>import("@/views/admin/UserManagement.vue")
    },
    {
        path: "add-coach",
        name: "add-coach",
        component: ()=>import("@/views/admin/AddCoach.vue")
    },
]
const routes :Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: ()=>import("@/views/home/Home.vue"),
        children:Home,
        
    },
    {
        path: "/login",
        name: "login",
        component: ()=>import("@/views/auth/Login.vue")
    },
    {
        path: "/register",
        name: "register",
        component: ()=>import("@/views/auth/Register.vue")
    },
    {
        path: "/user-info",
        name: "user-info",
        component: ()=>import("@/views/auth/UserInfo.vue")
    }
]



export const router = createRouter({
    history: createWebHistory(),
    routes
})