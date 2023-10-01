<script setup>
    const year = new Date().getFullYear();
</script>

<template>
    <footer>
        © Weather-Advisor {{ year }}
    </footer>
</template>

<style lang="scss" scoped>
 
 footer {
    height: 4.5rem;
    width: 100%;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.688rem;
    
    @media screen and (min-width: 768px) {
        height: 5.6rem;        
        font-size: 0.875rem;
    }
 }
</style>

