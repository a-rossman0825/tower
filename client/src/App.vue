<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<style lang="scss">


</style>
