<template>
    <div>
        <Suspense>
            <CityView/> 
            <template #fallback>
                <CityViewSkeleton /> 
            </template>
        </Suspense>
    </div>
</template>

<script setup>
    import CityView from "../components/CityView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>
