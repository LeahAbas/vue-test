import axios from "axios"

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/',
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    }
})

export const locationApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/',
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    }
})