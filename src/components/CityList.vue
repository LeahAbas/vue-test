<template>
    <p v-if="savedCity.length" class="heading">Your previous search result(s)</p>
    <p v-else>
        No locations added. Search to add a location.
    </p>

    <div class="cards-container">
        <div v-for="city in savedCity" :key="city.id" @click="goToCity(city)" class="cards-container-box">
            <CityCard :city="city" />
        </div>
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

<style lang="scss" scoped>
.heading {
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.cards-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-box {
        height: 4.5rem;
        width: 100%;
        border-radius: 0.9375rem;
        background-color: rgba(255, 255, 255, 0.50);
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(2.5px);
        padding: 0.6rem 1rem;
        cursor: pointer;

        &:hover {
            background-color: #0000000c;
        }

        @media screen and (min-width: 768px) {
            height: 6.25rem;
            padding: 0.8rem 1.5rem;
        }
    }

}
</style>