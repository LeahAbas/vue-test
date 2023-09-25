<template>
    <div>
        <Suspense>
            <CityView/> 
            <template #fallback>
                <p>Loading...</p>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
    import CityView from "../components/CityView.vue";
</script>

<style lang="scss" scoped>

</style>