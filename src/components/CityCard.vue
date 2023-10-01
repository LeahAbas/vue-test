<script setup lang="ts">
    defineProps({
        city: {
            type: Object,
            default: () => {},
        }

    })
</script>

<template>
    <div class="top">
        <h3>{{ city.city }}</h3>
        <h1> {{ Math.round(city.weather.main.temp) }}&deg;C</h1>
    </div>

    <div class="bottom">
        <p>
               {{ city.state }}
        </p>
        <div class="temp">
            <span>
                High: {{ Math.round(city.weather.main.temp_max) }}&deg;C
            </span>
            <i class="fa-solid fa-right-left text-green-600"></i>
            <span>
                Low: {{ Math.round(city.weather.main.temp_min) }}&deg;C
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;

    h3 {
        font-size: 1rem;
    }

    h1 {
        font-size: 1.25rem;
        color: #f84d4dce;
    }
}

.bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;

    .temp {
        font-size: 0.625rem;
        display: flex;
        align-items: center;
        gap: 12px
    }
}

@media screen and (min-width: 768px) {
    .top {
        h3 {
            font-size: 1.25rem;
        }

        h1 {
            font-size: 1.875rem;
        }
    }

    .bottom {
        .temp {
            font-size: 0.785rem;
        } 
    }
}

</style>

