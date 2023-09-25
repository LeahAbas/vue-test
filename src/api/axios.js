import axios from "axios"

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/',
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    }
})