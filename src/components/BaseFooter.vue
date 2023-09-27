<script setup>
    const year = new Date().getFullYear();
</script>

<template>
    <footer class="h-[4rem] md:h-[5.6rem] w-full bg-black text-white flex items-center justify-center text-[0.6875rem] md:text-[0.875rem]">
        © Weather-Advisor {{ year }}
    </footer>
</template>

