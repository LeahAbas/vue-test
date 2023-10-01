<template>
    <div class="loader">
      <div class="loader-top">
        <div class="loader-top-box" />
        <div  class="loader-top-box" />
        <div class="loader-top-box" />
        <div class="loader-top-box" />
      </div>

      <div class="loader-bottom">
        <div class="loader-bottom-box"/>
        <div class="loader-bottom-box"/>
      </div>
    </div>
  </template>
  
<style lang="scss" scoped>
.loader {
  height: 100vh;
  width: 100%;
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  &-top {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    &-box {
      padding: 1.2rem 0;
      border-radius: 3px;
      background: linear-gradient(100deg, #0000001c, #0000004a, #00000083);
      background-size: 400% 400%;
      animation: bg 2s ease infinite;

      &:nth-child(1){
        width: 40%;
      }

      &:nth-child(2){
        width: 60%;
        margin-bottom: 20px;
      }

      &:nth-child(3){
        width: 100%;
      }

      &:nth-child(4){
        width: 100%;
      }
    }

  }

  &-bottom {
    width: 80%;
    display: flex;
    justify-content: space-between;

    &-box {
      width: 48%;
      height: 30vh;
      border-radius: 10px;
      background: linear-gradient(100deg, #0000001c, #0000004a, #00000083);
      background-size: 400% 400%;
      animation: bg 2s ease infinite;
    }
  }

  @keyframes bg {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
  }

  @media screen and (min-width: 1024px) {
    margin-top: 9rem;
    gap: 7rem;

    &-top {
      width: 40%;

      .box {
        &:nth-child(1){
          width: 30%;
        }

        &:nth-child(2){
          width: 60%;
          margin-bottom: 50px;
        }

        &:nth-child(3){
          width: 80%;
        }

        &:nth-child(4){
          width: 80%;
        }
      }
    }

    &-bottom {
      width: 40%;
    }
  }
}

</style>
