import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE == "development" ? "https://chatify-server-1-t3ob.onrender.com/api/v1" : "",
    withCredentials: true,
})