<template>
    <p v-if="savedCity.length" class="text-[0.8rem] md:text-[1rem] text-white mb-[-1.2rem] md:mb-[-1.5rem]">Your previous search result(s)</p>
    <p v-else class="text-white text-[0.875rem] md:text-[1rem] px-3">
        No locations added. Search to add a location.
    </p>

    <div v-for="city in savedCity" :key="city.id">
        <CityCard :city="city" @click="goToCity(city)" />
    </div>
</template>

<script setup>
import CityCard from './CityCard.vue'
import { ref } from "vue"
import { useRouter } from "vue-router";
import { weatherApi } from "../api/axios"

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
            requests.push(weatherApi.get(
                `data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${apiKey}&units=metric`
            ));
        });

        const weatherData = await Promise.all(requests);

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