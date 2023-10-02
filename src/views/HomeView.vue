<script setup>
import { ref, onMounted, computed } from "vue";
import {uid} from "uid"
import { useRouter} from "vue-router";
import { getAddress, getLocation } from "../api/requests";
import { useToast } from 'vue-toast-notification';
import { store } from "../store";
import 'vue-toast-notification/dist/theme-sugar.css';
import debounce from 'lodash/debounce';
import CityCardSkeleton from "../components/CityCardSkeleton.vue";
import CityList from "../components/CityList.vue"

const router = useRouter()
const search = ref('')
const mapboxResult = ref(null)
const searchError = ref(false)
const toast = useToast();
const savedLocations = computed(() => store.state.savedLocations)

const getUserLocation = () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
          
        const getCurrentLocation = async () => {
          const data = await getLocation(latitude, longitude)
          
          if(data){
            search.value = data.features[0].properties.name
          }
        }

        getCurrentLocation()
      });

  } else {
    console.log("Location not supported")
  }
}

onMounted(() => {
  getUserLocation()
})

const debouncedSearch = debounce(async () => {
  if (search.value !== '') {
    try {
      const data = await getAddress(search.value);

      mapboxResult.value = data.features;
    } catch (e) {
      console.error(e);
    }
  } else {
    mapboxResult.value = null;
  }
}, 300);

const viewLocation = (location) => {
  const [city, state] = location.place_name.split(',')
  const locationObj = {
    id: uid(),
    city: city,
    state: state,
    coords: {
      lat: location.geometry.coordinates[1],
      lng: location.geometry.coordinates[0]
    }
  };

    if (savedLocations.value.length) {
        const cityExists = savedLocations.value.find((c) => c.city === city) || null;

        if (!cityExists) {
          const newCities = [locationObj, ...savedLocations.value];
          store.commit('setSavedLocations', newCities)

          toast.success('Location Details Saved', {
            position: 'top-right'
          });
        }

        store.commit('setCoords', locationObj.coords)
    } else {
      store.commit('setSavedLocations', [locationObj])
      store.commit('setCoords', locationObj.coords)

      toast.success('Location Details Saved', {
        position: 'top-right'
      });
    }

    router.push({
      name: 'location',
      params: {name: city.trim()}
    })
}
</script>

<template>
  <main class="home">
    <div class="home-container">
      <div class="home-box">
        <div class="home-input-container">
          <input type="text" @input="debouncedSearch" v-model="search" autofocus placeholder="Enter a city name"/>
          <span>
            <i class="fa-solid fa-magnifying-glass"></i>
          </span>

          <ul v-if="mapboxResult">
            <p v-if="searchError">Failed, Please try again.</p>
            <p v-if="mapboxResult.length === 0  && !searchError">No result found</p>

            <template v-else>
              <li 
                v-for="item in mapboxResult" :key="item.id"
                @click="viewLocation(item)" 
                >
                {{  item.place_name }}
              </li>
            </template>
          </ul>
        </div>
        
        <div class="home-city-list">
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

<style lang="scss" scoped>
  .home{
    min-height: 100vh;
    background-image: url('../assets/images/heroBg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    
    &-container {
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 7rem 20px;
      background-color: rgba(0, 0, 0, 0.3); 
      backdrop-filter: 5px;
      backdrop-filter: blur(5px);
    }

    &-box {
      width: 90%;
      height: 35rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      border-radius: 2rem;
      background-color: rgba(255, 255, 255, 0.439);
      backdrop-filter: blur(20px);
      padding: 1rem;
    }

    &-input-container {
      position: relative;
      height: 3rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: 3.125rem;
      background-color: rgba(255, 255, 255, 0.50);
      padding: 0 0.4rem;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(2.5px);
      z-index: 5;
      
      input {
        height: 70%;
        width: 80%;
        outline: none;
        border: 0;
        font-size: 0.875rem;
        color: black;
        background-color: transparent;
        padding-left: 0.7rem;

        &::placeholder{
          color: rgba(0, 0, 0, 0.684)
        }
      }

      span {
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        color: white;
        background-color: var(--accent-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.7rem;
      }

      ul {
        position: absolute;
        top: 115%;
        left: 0;
        border-radius: 20px;
        background-color: white;
        width: 100%;
        padding: 16px 24px;
        border: 1px solid black;
        box-shadow: 0 1px 20px #000000ad;
        
        p {
          color: var(--accent-color);
        }
        
        li {
          font-size: 0.875rem;
          padding: 0.4rem 0;
          cursor: pointer; 

          &:hover {
            color: var(--accent-color);
          }
        }
      }

      &:focus-within {
        box-shadow: 0 0 10px #f84d4dce;
      }
    }

    &-city-list {
      width: 100%;
      height: 82%;
      display: flex;
      flex-direction: column;
      font-size: 0.875rem;
      overflow-y: auto;
    }
    
    @media screen and (min-width: 768px){
      &-container {
        padding: 10rem 0;
      }

      &-box {
        gap: 0;
        justify-content: space-between;
        width: 30rem;
        border-radius: 2.5rem;
        padding: 2rem;
      }

      &-input-container {
        height: 3.125rem;
        padding: 0 0.5rem;

        input {
          font-size: 1rem;
          padding-left: 1rem;
        }

        span {
          height: 2.3rem;
          width: 2.3rem;
          font-size: 1rem;
        }

        ul {
          li {
            padding: 0.5rem 0;
            font-size: 1rem;
          }
        }
      }

      &-city-list {
        font-size: 1rem;
      }
    }
  }

</style>