<script setup>
import { ref, computed } from "vue";
import { getWeatherReport, getCityWeather, getPastWeather } from "../api/requests"
import { store } from "../store";
import dayjs from "dayjs"

    const showDetails = ref(false)
    const currentDate = dayjs()
    const timestamps = []
    const coords = computed(() => store.state.coords)

    for (let i = 1; i <= 5; i++) {
        const previousDate = currentDate.subtract(i, 'day');
        const unixTimestamp = previousDate.unix();
        timestamps.push(unixTimestamp);
    }

    const getWeatherData = async () => {
        try {
            const [weather, temp] = await Promise.all([
                getWeatherReport(coords.value.lat, coords.value.lng),
                getCityWeather(coords.value.lat, coords.value.lng)
            ]);

            return { weather, temp };
        } catch (e) {
            console.log(e);
        }
    };

    const getPastReport = async () => {
        
        try {
           const req = timestamps.map((stamp) => {
               return getPastWeather(coords.value.lat, coords.value.lng, stamp)
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
    <div class="city-view">
        <div class="city-view-container">            
            <div class="top">
                <p> 
                    {{ dayjs().format("dddd, MMMM D, YYYY h:mm A") }}
                </p>
                <p>{{ weatherTemp.name }}, {{ weatherTemp.sys.country }}</p>
            </div>

            <h1>{{ Math.round(weatherReport.current.temp) }}&deg;C</h1>

            <div class="desc">
                <p>{{ weatherReport.current.weather[0].description }}</p>
                <div class="desc-icon-box">
                    <img
                        :src="
                        `http://openweathermap.org/img/wn/${weatherReport.current.weather[0].icon}@2x.png`
                        "
                        alt="weather"
                    />
                </div>
            </div>

            <div class="high-low">
                <span>Today’s High: {{ Math.round(weatherTemp.main.temp_max) }}&deg;C</span>
                <span>Today’s Low: {{ Math.round(weatherTemp.main.temp_min) }}&deg;C</span>
            </div>

            <button @click="showDetails = !showDetails">{{showDetails ? "Hide" : "View more"}}</button>

            <Transition name="details">
                <ul v-show="showDetails" class="details-box">
                    <li v-for="(item, index) in details" :key="index">
                        <p>{{ item.title }}</p>
                        <h3>{{ item.value }}</h3>
                    </li>
                </ul>
            </Transition>

            <div class="bottom">
                <div class="bottom-box">
                    <h4>Forcast</h4>

                    <div v-for="item in weatherReport.daily" :key="item.dt" class="item-forcast">
                        <p>{{ dayjs.unix(item.dt).format("dddd") }}</p>
                        <span class="text-accentColor">
                            H:{{ Math.round(item.temp.max) }}&deg;C 
                                <i class="fa-solid fa-right-left fa-xs text-green-600"></i>
                            L:{{ Math.round(item.temp.min) }}&deg;C</span>
                    </div>
                </div>

                <div class="bottom-box">
                    <h4>Past 5 Days</h4>

                    <div  v-for="item in pastReport" :key="item.current.dt" class="item-past">
                        <p>{{ dayjs.unix(item.current.dt).format("dddd") }}</p>
                        <span class="text-accentColor"> {{ Math.round(item.current.temp) }}&deg;C</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.city-view {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    font-size: 0.875;
    padding-top: 7rem;

    &-container {
        width: 90%;
        padding-bottom: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .top {
        p:nth-Child(2){
            font-weight: 600;
        }
    }
    h1 {
        font-weight: 600;
        font-size: 4.375rem;
        margin-top: 1.5rem;
    }

    .desc {
        display: flex;
        flex-direction: column;
        align-items: center;  

        p {
            font-weight: 600;
            color: var(--accentColor);
            margin-bottom: 1rem;
            text-transform: capitalize;
        }

        &-icon-box {
            width: 2.85rem;
            height: 2.85rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: var(--accent-color);
            filter: drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.332));

            img {
                height: 3rem;
                background-size: cover;
            }
        }
    }

    .high-low {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        margin-top: 1.5rem;
    }

    button {
        color: white;
        background-color: black;
        border-radius: 0.5rem;
        height: 2.5rem;
        width: 7.5rem;
        margin-top: 0.94rem;
        font-size: 0.785rem;
        transition: transform 0.4s ease;

        &:hover {
            transform: scale(1.1);
        }
    }

    .details-box {
        display: flex;
        flex-wrap: wrap;
        gap: 1.5rem;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        width: 100%;
        border-radius: 0.5rem;
        background-color: rgba(201, 201, 201, 0.45);
        box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.10);
        margin-top: 2.1rem;

        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            h3 {
                font-weight: 600;
                margin-top: 4px;
            }
        }
    }

    .bottom {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 2.5rem;

        &-box {
            width: 100%;
            border-radius: 0.5rem;
            background-color: rgba(201, 201, 201, 0.45);
            box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.10);
            padding: 1rem;

            &:nth-child(1){
                margin-bottom: 1.5rem;
            }

            h4 {
                text-align: center;
                font-weight: 500;
                font-size: 1rem;
                margin-bottom: 0.8rem;
            }

            .item-forcast {
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;

                span {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
            }
            .item-past {
                margin-bottom: 14px;
                display: flex;
                justify-content: space-between;
            }
        }
    }

    @media screen and (min-width: 768px) {
        font-size: 1rem;
        padding-top: 8rem;

        &-container {
            width: 40rem
        }

        h1 {
            font-size: 5.5rem;
        }

        .desc {
            &-icon-box {
                width: 3.5rem;
                height: 3.5rem;
            }
        }

        .high-low {
            margin-top: 2.5rem;
        }

        button {
            font-size: 0.875rem;
        }

        .bottom {
            flex-direction: row;

            &-box {
                width: 48%;

                &:nth-child(1){
                    margin-bottom: 0;
                }

                h4 {
                    font-size: 1.25rem;
                    margin-bottom: 1rem;
                }
            }
        }
    }
}
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