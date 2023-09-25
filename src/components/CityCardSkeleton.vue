<template>
    <div class="flex py-6 px-3 bg-secondary rounded-md shadow-md">
        <div class="flex flex-col flex-1 gap-2">
            <PageLoader class="max-w-[50%]"/>
            <PageLoader class="max-w-[40%]"/>
        </div>
        
        <div class="flex flex-col items-end flex-1 gap-2">
            <PageLoader class="max-w-[50px] w-full"/>
            <PageLoader class="max-w-[75px] w-full"/>
        </div>
    </div>
</template>

<script setup>
import PageLoader from "./PageLoader.vue";


</script>