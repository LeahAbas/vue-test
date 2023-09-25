<template>
    <div v-for="city in savedCity" :key="city.id">
        <CityCard :city="city" @click="goToCity(city)" />
    </div>

    <p v-if="savedCity.length === 0">
        No locations added.
    </p>
</template>

<script setup>
import CityCard from './CityCard.vue'
import { ref } from "vue"
import axios from "axios"
import { useRouter } from "vue-router";
const apiKey = import.meta.env.VITE_WEATHER_API

const router = useRouter()
const savedCity = ref([])

const getCities = async () => {
    if (localStorage.getItem("savedCities")) {
        savedCity.value = JSON.parse(
            localStorage.getItem("savedCities")
        );

        const requests = [];
        savedCity.value.forEach((city) => {
            requests.push(axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${apiKey}&units=imperial`
            ));
        });

        const weatherData = await Promise.all(requests);

        // Delay to show loader
        await new Promise((res) => setTimeout(res, 1000))

        weatherData.forEach((value, index) => {
            savedCity.value[index].weather = value.data;
        });
    }
};
await getCities()

const goToCity = (city) => {
    router.push({
    name: "location",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
}

</script>