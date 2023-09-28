<script setup>
import { ref } from "vue";
import { getWeatherReport, getCityWeather, getPastWeather } from "../api/requests"
import { useRoute } from "vue-router";
import dayjs from "dayjs"

    const route = useRoute();
    const showDetails = ref(false)
    const currentDate = dayjs()
    const timestamps = []

    for (let i = 1; i <= 5; i++) {
        const previousDate = currentDate.subtract(i, 'day');
        const unixTimestamp = previousDate.unix();
        timestamps.push(unixTimestamp);
    }

    const getWeatherData = async () => {
        try {
            const [weather, temp] = await Promise.all([
                getWeatherReport(route.query.lat, route.query.lng),
                getCityWeather(route.query.lat, route.query.lng)
            ]);

            return { weather, temp };
        } catch (e) {
            console.log(e);
        }
    };

    const getPastReport = async () => {
        
        try {
           const req = timestamps.map((stamp) => {
               return getPastWeather(route.query.lat, route.query.lng, stamp)
           })

            const responses = await Promise.all(req)
            
            return responses
       } catch (e){
            console.log(e);
       }
    }

    const pastReport = await getPastReport()
    const data  = await getWeatherData();
    const weatherReport = data.weather
    const weatherTemp = data.temp

    const details = [
    {
        title: "Wind Speed",
        value: `${Math.round(weatherReport.current.wind_speed)} metre/sec`,
    },
    {
        title: "Humidity",
        value: `${weatherReport.current.humidity}%`,
    },
    {
        title: "Pressure",
        value: `${weatherReport.current.pressure} hPa`,
    },
    {
        title: "Sunrise/Sunset Time",
        value: `${dayjs.unix(weatherReport.current.sunrise).format("h:mm A")} / ${dayjs.unix(weatherReport.current.sunset).format("h:mm A")}`,
    }
]

</script>

<template>
    <div class="min-h-screen flex justify-center text-[0.875rem] md:text-[1rem] pt-[4.5rem] md:pt-[5rem]">
        <div class="w-[90%] md:w-[40rem] pb-[3rem] flex flex-col items-center">
            <RouterLink :to="{name: 'home'}">
                <i class="fa-solid fa-arrow-left fa-xl text-white fixed top-[5%] z-[50] md:left-[3%] right-[10%] md:right-0 cursor-pointer"></i>
            </RouterLink>
            
            <div class="text-center mt-[1.5rem] md:mt-[3rem]">
                <p> 
                    {{ dayjs().format("dddd, MMMM D, YYYY h:mm A") }}
                </p>
                <p class="font-semibold">{{ weatherTemp.name }}, {{ weatherTemp.sys.country }}</p>
            </div>

            <h1 class="font-semibold text-[4.375rem] md:text-[5.5rem] mt-[1.5rem]">{{ Math.round(weatherReport.current.temp) }}<sup>o</sup>C</h1>

            <div class="text-center flex flex-col items-center">
                <p class="font-semibold text-accentColor mb-1 capitalize">{{ weatherReport.current.weather[0].description }}</p>
                <div class="flex items-center justify-center h-[2.8125rem] w-[2.8125rem] md:h-[3.4375rem] md:w-[3.4375rem] rounded-full bg-accentColor drop-shadow-[2px_2px_10px_rgba(0,0,0,0.2)]">
                <img
                    class="h-[3rem] object-cover"
                    :src="
                    `http://openweathermap.org/img/wn/${weatherReport.current.weather[0].icon}@2x.png`
                    "
                    alt="weather"
                    />
                </div>
            </div>

            <div class="flex items-center gap-[1.25rem] mt-[1.5rem] md:mt-[2.5rem]">
                <span>Today’s High: {{ Math.round(weatherTemp.main.temp_max) }}<sup>o</sup>C</span>
                <span>Today’s Low: {{ Math.round(weatherTemp.main.temp_min) }}<sup>o</sup>C</span>
            </div>

            <button @click="showDetails=!showDetails" class="text-white bg-black rounded-[0.5rem] h-[2.5rem] w-[7.5rem] mt-[0.94rem] text-[0.785rem] md:text-[0.875rem]">{{showDetails ? "Hide" : "View more"}}</button>

            <Transition name="details">
                <ul v-if="showDetails" class="flex justify-between flex-wrap px-[1.5rem] h-[10rem] md:h-[4.5rem] w-full rounded-[0.5rem] bg-[rgba(201,201,201,0.45)] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.10)] mt-[2.1rem]">
                    <li v-for="(item, index) in details" :key="index" class="flex flex-col items-center justify-center">
                        <p>{{ item.title }}</p>
                        <h3 class="font-semibold mt-1">{{ item.value }}</h3>
                    </li>
                </ul>
            </Transition>

            <div class="flex flex-col md:flex-row justify-between w-full mt-[2.5rem]">
                <div class="w-full md:w-[48%] mb-[1.5rem] md:mb-0 rounded-[0.5rem] bg-[rgba(201,201,201,0.45)] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.10)] p-[1rem]">
                    <h4 class="text-center text-[1rem] md:text-[1.25rem] mb-[0.8rem] md:mb-[1rem]  font-medium">Forcast</h4>

                    <div v-for="item in weatherReport.daily" :key="item.dt" class="mb-2">
                        <div class="flex justify-between">
                            <p >{{ dayjs.unix(item.dt).format("dddd") }}</p>
                            <span class="text-accentColor">H:{{ Math.round(item.temp.max) }}<sup>o</sup>C  L:{{ Math.round(item.temp.min) }}<sup>o</sup>C</span>
                        </div>
                    </div>
                </div>

                <div class="w-full md:w-[48%] rounded-[0.5rem] bg-[rgba(201,201,201,0.45)] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.10)] p-[1rem]">
                    <h4 class="text-center mb-[0.8rem] md:mb-[1rem] text-[1rem] md:text-[1.25rem] font-medium">Past 5 Days</h4>

                    <div v-for="item in pastReport" :key="item.current.dt" class="mb-3">
                        <div class="flex justify-between">
                            <p>{{ dayjs.unix(item.current.dt).format("dddd") }}</p>
                            <span class="text-accentColor"> {{ Math.round(item.current.temp) }} <sup>o</sup>C</span>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.details-enter-active {
  transition: all 0.3s ease-out;
}

.details-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.details-enter-from,
.details-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>