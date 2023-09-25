<script setup>
    import { getWeatherReport } from "../api/requests"
    import { useRoute } from "vue-router";

    const route = useRoute();

    const getWeatherData = async () =>{
        try{
            const data = await getWeatherReport(route.query.lat, route.query.lng)

            // cal current date & time
            const localOffset = new Date().getTimezoneOffset() * 60000;
            const utc = data.current.dt * 1000 + localOffset;
            
            data.currentTime =
            utc + 1000 * data.timezone_offset;

            // cal hourly weather offset
            data.hourly.forEach((hour) => {
            const utc = hour.dt * 1000 + localOffset;
            hour.currentTime =
                utc + 1000 * data.timezone_offset;
            });

            return data;
        } catch(e){
            console.log(e)
        }
    }

    const weatherReport = await getWeatherData();

</script>

<template>
    <div class="flex flex-col flex-1 items-center">

        <!-- Banner -->
        <div v-if="route.query.preview" class="text-white p-4 bg-secondary w-full text-center">
            <p>You are viewing the city. Click "+" icon to start tracking this city</p>
        </div>

        <!-- Weather Overview -->
        <div class="flex flex-col text-white py-12 items-center">
            <h1 class="text-4xl mb-2">{{ route.query.city }}</h1>
            <p class="text-sm mb-12">
                {{
                new Date(weatherReport.currentTime).toLocaleDateString(
                    "en-us",
                    {
                    weekday: "short",
                    day: "2-digit",
                    month: "long",
                    }
                )
                }}
                {{
                new Date(weatherReport.currentTime).toLocaleTimeString(
                    "en-us",
                    {
                    timeStyle: "short",
                    }
                )
                }}
            </p>
            <p class="text-8xl mb-8">
                {{ Math.round(weatherReport.current.temp) }}&deg;
            </p>
            <p>
                Feels like
                {{ Math.round(weatherReport.current.feels_like) }} &deg;
            </p>
            <p class="capitalize">
                {{ weatherReport.current.weather[0].description }}
            </p>
            <img
                class="w-[150px] h-auto"
                :src="
                `http://openweathermap.org/img/wn/${weatherReport.current.weather[0].icon}@2x.png`
                "
                alt="weather"
            />

        </div>

        <hr class="border-white border-opacity-10 border w-full" />

        <!-- Hourly Weather -->
        <div class="max-w-screen w-full my-12">
            <div class="mx-8 text-white">
                <h2 class="mb-4">
                    Hourly Weather
                </h2>
                <div class="flex gap-10 overflow-x-scroll">
                    <div v-for="hour in weatherReport.hourly" :key="hour.dt" class="flex flex-col gap-4 items-center">
                    <p class="whitespace-wrap text-md">{{ 
                        new Date(hour.currentTime).toLocaleTimeString("en-us", {
                            hour: "numeric",
                        })
                        }}
                    </p>
                    <img
                        class="w-auto h-[50px] object-cover"
                        :src="
                            `http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`
                        "
                        alt="hourly-weather"
                        />
                        <p class="text-xl">
                        {{ Math.round(hour.temp) }}&deg;
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Weekly Weather -->
        <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
            <h2 class="mb-4">7 Day Forecast</h2>
            <div
            v-for="day in weatherReport.daily"
            :key="day.dt"
            class="flex items-center"
            >
            <p class="flex-1">
                {{
                new Date(day.dt * 1000).toLocaleDateString(
                    "en-us",
                    {
                    weekday: "long",
                    }
                )
                }}
            </p>
            <img
                class="w-[50px] h-[50px] object-cover"
                :src="
                `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
                "
                alt=""
            />
            <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.temp.max) }}</p>
            <p>L: {{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>