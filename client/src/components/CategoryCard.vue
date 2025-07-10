<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';

const categories = computed(()=> AppState.categories);

</script>


<template>
<div class="row justify-content-center ms-2 card-gallery">
  <div @click="AppState.activeCategory = category.name" v-for="category in categories" :key="category.name" class="col-10 col-md-2 ps-md-1 pe-md-1 mb-2 card-bg text-center me-4 rounded my-card">
      <i :class="`${category.emoji} text-${category.color} fs-1`"></i>
      <h5>{{ category.nickname }}</h5>
  </div>
</div>
</template>


<style lang="scss" scoped>
.card-bg {
  background-color: #696969;
  box-shadow: 2px 2px 3px rgba(24, 24, 24, 0.78);
  color: white;
  text-shadow: 1px 1px 2px black;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #868484;
    box-shadow: 2px 2px 3px whitesmoke;
    transform: translate(-1px, -1px);
    cursor: pointer;
  }

  &:active {
    background-color: whitesmoke;
    color: rgb(24, 24, 24, 0.78);
    text-shadow: 1px 1px 2px whitesmoke;
    box-shadow: 2px 2px 3px rgb(24, 24, 24, 0.78);
    transform: translate(1px, 1px);
  }
}



i {
  text-shadow: 1px 1px 2px whitesmoke;
}
</style>