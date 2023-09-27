<script setup>
import { ref } from "vue";
import {uid} from "uid"
import { useRouter} from "vue-router";
import debounce from 'lodash/debounce';
import { getAddress } from "../api/requests";
import CityList from "../components/CityList.vue"
import CityCardSkeleton from "../components/CityCardSkeleton.vue";


const router = useRouter()

const search = ref('')
const mapboxResult = ref(null)
const searchError = ref(false)

const debouncedSearch = debounce(async () => {
  if (search.value.length >= 2) {
    try {
      const data = await getAddress(search.value);

      mapboxResult.value = data.features;
    } catch (e) {
      console.error(e);
    }
  } else {
    mapboxResult.value = null;
  }
}, 500);

const addCity = (item, city, state) => {
  let savedCity = [];

    if (localStorage.getItem("savedCities")) {
        savedCity = JSON.parse(
        localStorage.getItem("savedCities")
        );
    }

    const locationObj = {
        id: uid(),
        state: state,
        city: city,
        coords: {
          lat: item.geometry.coordinates[1],
          lng: item.geometry.coordinates[0]
        }
    };

    const newCities = [locationObj, ...savedCity];
    localStorage.setItem('savedCities', JSON.stringify(newCities))
}

const viewLocation = (location) => {
  const [city, state] = location.place_name.split(',')

  addCity(location, city, state)

  
  router.push({
    name: 'location',
    params: {state:state.trim(), city:city},
    query: {
      lat: location.geometry.coordinates[1],
      lng: location.geometry.coordinates[0]
    }
  })
}
</script>

<template>
  <main class="h-[calc(100vh-4rem)] md:h-[calc(100vh-5.6rem)] bg-hero-image bg-cover">
    <div class="h-full w-full bg-[rgba(0,0,0,0.65)] backdrop-blur-[5px] flex flex-col items-center pt-[8rem] px-[25px] md:px-0">
      <div class="relative w-full md:w-[33rem] h-[65vh] flex flex-col gap-[1.2rem] md:gap-[2rem] rounded-[2rem] md:rounded-[2.5rem] bg-[rgba(255,255,255,0.08)] backdrop-blur-[20px] p-[1.5rem] md:p-[2rem]">
        <div class="h-[2.19rem] md:h-[3.125rem] w-full rounded-[3.125rem] bg-[rgba(255,255,255,0.50)] flex items-center justify-between px-[0.5rem] md:px-[0.94rem] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] backdrop-blur-[2.5px]">
          <input class="h-[70%] w-[80%] outline-none border-0 text-[0.75rem] md:text-[1rem] text-black bg-transparent pl-[0.7rem] md:pl-[1rem] placeholder:text-black" type="text" @input="debouncedSearch" v-model="search" placeholder="Enter city name"/>
          <span class="h-[1.6rem] w-[1.6rem] md:h-[2.1875rem] md:w-[2.1875rem] rounded-full bg-accentColor flex items-center justify-center">
            <i class="fa-solid fa-magnifying-glass text-white text-[0.7rem] md:text-[1rem]"></i>
          </span>
        </div>
   

        <ul v-if="mapboxResult" class="z-[10] w-[88%] px-4 py-2 absolute top-[17%] left-[6%] rounded-[10px] bg-white shadow-xl">
          <p v-if="searchError">Failed, Please try again.</p>
          <p v-if="mapboxResult.length === 0  && !searchError" class="text-accentColor">No result found</p>

          <template v-else>
            <li 
              v-for="item in mapboxResult" :key="item.id"
              class="py-2 cursor-pointer hover:text-accentColor text-[1rem]" 
              @click="viewLocation(item)" 
              >
              {{  item.place_name }}
            </li>
          </template>
        </ul>

        
        <div class="w-full h-[80%] flex flex-col gap-[1.5rem] md:gap-[1.8rem] overflow-y-auto">
          <Suspense>
            <CityList/>
            
            <template #fallback>
              <CityCardSkeleton />
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </main>
</template>
