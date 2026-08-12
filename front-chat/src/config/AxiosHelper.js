import axios from 'axios';
export const baseURL = "https://chat-app-backend-gzx9.onrender.com";
export const  httpClient = axios.create({
    baseURL: baseURL ,
   
});
