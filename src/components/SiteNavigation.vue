
<template>
    <header class="fixed top-0 left-0 w-full bg-black text-white z-[30] h-[4.5rem] md:h-[5.6rem] flex items-center justify-center">
        <nav class="flex item-center justify-between w-[33rem]">
            <RouterLink :to="{name: 'home'}">
                <div class="flex gap-3 items-end px-[1rem] md:px-0">
                    <img class="h-[2.2rem] md:h-[3rem]" :src="logo" alt="logo"/>
                    <p class="text-[1.3rem] md:text-[1.8rem] text-white">Weather Advisor</p>
                </div>
            </RouterLink>
        </nav>
    </header>
</template>

<script setup>
    import { RouterLink } from "vue-router";
    import logo from "../assets/images/logo.webp"


</script>
