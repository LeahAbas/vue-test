<template>
    <div class="loader">
        <div class="loader-container">
            <div class="box" />
            <div class="box" />
        </div>
        
        <div class="loader-container">
            <div class="box" />
            <div class="box" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.loader{
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 1rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.297);

    &-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 49%;
        
        .box {
            padding: 0.9rem 0;
            border-radius: 4px;
            background: linear-gradient(270deg, #0000001c, #0000004a, #00000083);
            background-size: 400% 400%;
            animation: bg 2s ease infinite;

            @keyframes bg {
                0%{background-position:0% 50%}
                50%{background-position:100% 50%}
                100%{background-position:0% 50%}
            }
        }
    }
}
</style>