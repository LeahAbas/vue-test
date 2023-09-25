
<template>
    <header class="sticky top-0 bg-primary shadow-lg">
        <nav class="container flex flex-col sm:flex-row item-center gap-4 text-white py-6">
            <RouterLink :to="{name: 'home'}">
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-sun text-2xl"></i>
                    <p class="text-2xl">The Weather Report</p>
                </div>
            </RouterLink>

            <div class="flex gap-3 flex-1 justify-end">
                <i @click="toggleModal" class="fa-circle-info fa-solid text-xl hover:text-secondary duration-150 cursor-pointer"></i>
                <i @click="addCity" v-if="route.query.preview" class="fa-solid fa-plus text-xl hover:text-secondary duration-150 cursor-pointer"></i>
            </div>

            <BaseModal :modal-active="modalActive" @close="toggleModal">
                <div class="text-black">
                    <h1 class="mb-2">Lorem ipsum dolor delectus.
                    </h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi tenetur sint enim error aperiam debitis autem nisi culpa eligendi reiciendis, neque odit qui voluptas cumque dicta officia earum ducimus. Odio! </p>
                </div>
            </BaseModal>
        </nav>
    </header>
</template>

<script setup>
    import { RouterLink, useRouter, useRoute } from "vue-router";
    import {uid} from "uid"
    import BaseModal from "./BaseModal.vue"
    import { ref } from "vue";

    const route = useRoute();
    const router = useRouter();

    const modalActive = ref(null)
    const savedCity = ref([]);

    const toggleModal = () => {
        modalActive.value = !modalActive.value
    };

    const addCity = () => {
        if (localStorage.getItem("savedCities")) {
            savedCity.value = JSON.parse(
            localStorage.getItem("savedCities")
            );
        }

        const locationObj = {
            id: uid(),
            state: route.params.state,
            city: route.params.city,
            coords: {
                lat: route.query.lat,
                lng: route.query.lng,
            }
        };

        savedCity.value.push(locationObj)
        localStorage.setItem('savedCities', JSON.stringify(savedCity.value))

        let query = Object.assign({}, route.query)
        delete query.preview
        query.id = locationObj.id
        router.replace({query})
    }

</script>
