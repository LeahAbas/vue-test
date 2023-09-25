<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAddress } from "../api/requests";

const router = useRouter()
const search = ref('')
const timeout = ref(null)
const mapboxResult = ref(null)
const searchError = ref(false)


const getSearchQuery = () => {
  clearTimeout(timeout.value);

  timeout.value = setTimeout( async () => {
    if(search.value !== ''){
     try {
      const data = await getAddress(search.value)

      mapboxResult.value = data.features;
     } catch(e) {
      searchError.value = true
     }
    } else {
      mapboxResult.value = null;
    }
   
  }, 300)
}

const viewLocation = (location) => {
  const [city, state] = location.place_name.split(',')
  router.push({
    name: 'location',
    params: {state:state.trim(), city:city},
    query: {
      lat: location.geometry.coordinates[1],
      lng: location.geometry.coordinates[0],
      preview: true
    }
  })
}

</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" @input="getSearchQuery" v-model="search" placeholder="Search" class="py-2 px-1 w-full bg-transparent border-b focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"/>
      <ul v-if="mapboxResult" class="text-white absolute bg-secondary w-full shadow-md py-2 px-1 top-[66px]">
        <p v-if="searchError">Failed, Please try again.</p>
        <p v-if="mapboxResult.length === 0  && !searchError">No result found</p>

        <template v-else>
          <li 
            v-for="item in mapboxResult" :key="item.id"
            class="py-2 cursor-pointer text-white" 
            @click="viewLocation(item)" 
            >
            {{  item.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
