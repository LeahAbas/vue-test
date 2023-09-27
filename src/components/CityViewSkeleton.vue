<template>
    <div class="flex flex-col flex-1 mt-[5rem] md:mt-[6rem]">
      <!-- Overview -->
      <div class="flex flex-col py-12 items-center">
        <PageLoader  class="max-w-[90%] md:max-w-[500px] w-full mb-2" />
        <PageLoader  class="max-w-[90%] md:max-w-[500px] w-full mb-12" />
        <PageLoader 
          class="max-w-[90%] md:max-w-[500px] h-[100px] w-full mb-12"
        />
        <PageLoader  class="max-w-[90%] md:max-w-[500px] w-full mb-8" />
        <PageLoader 
          class="max-w-[90%] md:max-w-[500px] h-[75px] w-full"
        />
      </div>

      <div class="flex flex-col py-12 px-8 items-center">
        <PageLoader 
          class="max-w-screen-md h-[100px] w-full mb-12 "
        />
      </div>

      <div class="flex flex-col py-12 px-8 items-center">
        <PageLoader 
          class="max-w-screen-md h-[100px] w-full mb-12"
        />
      </div>
    </div>
  </template>
  
  <script setup>
    import PageLoader from "./PageLoader.vue"
  </script>
