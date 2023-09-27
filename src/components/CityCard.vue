<script setup lang="ts">
    defineProps({
        city: {
            type: Object,
            default: () => {},
        }

    })
</script>

<template>
    <div class="h-[5rem] md:h-[6.25rem] w-full rounded-[0.9375rem] transition bg-[rgba(255,255,255,0.50)] hover:bg-[rgba(255,255,255,0.65)] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.15)] backdrop-blur-[2.5px] py-[0.8rem] px-[1rem] md:px-[1.5rem] cursor-pointer">
        <div class="flex justify-between items-center">
            <h3 class="text-[1rem] md:text-[1.25rem] font-semibold">{{ city.city }}</h3>
            <h1 class="font-semibold text-[1.25rem] md:text-[1.875rem] text-white"> {{ Math.round(city.weather.main.temp) }}&deg;</h1>
        </div>

        <div class="flex justify-between items-center mt-[2px] md:mt-0">
            <p class="text-[0.75rem] md:text-[1rem]">
               {{ city.state }}
            </p>
            <div class="text-[0.625rem] md:text-[0.75rem] flex items-center gap-2">
                <span>
                    High: {{ Math.round(city.weather.main.temp_max) }}&deg;
                </span>
                <span>
                    Low: {{ Math.round(city.weather.main.temp_min) }}&deg;
                </span>
            </div>
        </div>
    </div>
</template>

