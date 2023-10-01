<script setup>
    import { useRoute, RouterLink } from "vue-router"
    import logo from "../assets/images/logo.webp"

    const route = useRoute();
    const detailsPage = 'location';
</script>

<template>
    <header>
        <RouterLink v-if="route.name === detailsPage" :to="{name: 'home'}" class="back-icon">
            <i class="fa-solid fa-arrow-left"></i>
        </RouterLink>
        
        <nav>
            <RouterLink :to="{name: 'home'}">
                <img :src="logo" alt="logo"/>
            </RouterLink>
            <h1>Weather Advisor</h1>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
header {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 4.5rem;
    display: flex;
    align-items: center;
    background-color: black;
    z-index: 30;
    padding: 0 1.5rem;

    .back-icon {
        color: white;
        font-size: 1.2rem;
        margin: 0.4rem 1.5rem 0 0;
    }

    nav {
        width: 100%;
        display: flex;
        gap: 1rem;
        align-items: flex-end;

        img {
            height: 2.2rem
        }

        h1 {
            color: white;
            font-size: 1.2rem;
        }
    }
    
    @media screen and (min-width: 768px) {
        height: 5.6rem;
        padding: 0 3rem;

        .back-icon {
            font-size: 1.6rem;
        }
        
        nav {
            img {
                height: 3rem;
            }

            h1 {
                font-size: 1.5rem;
            }
        }
    }

    @media screen and (min-width: 1024px) {
        nav {
            max-width: 33rem;
            margin: 0 auto;
            justify-content: space-between;
            gap: 0;
        }
    }
}
</style>
