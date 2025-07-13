<script setup>
import { AppState } from '@/AppState.js';
import { computed, onMounted, ref } from 'vue';


onMounted(() => {
  setInterval(() => {
    currentSlideIndex.value++;
    if (currentSlideIndex.value >= AppState.slides.length) {
      currentSlideIndex.value = 0;
    }
  }, 13000);
})



const slides = computed(() => AppState.slides);
const currentSlideIndex = ref(0);

</script>


<template>
  <div class="hero-container">
    <div v-for="(slide, index) in slides" :key="index" class="slide"
      :style="{ backgroundImage: `url(${slide.imgUrl})` }" :class="{ active: index === currentSlideIndex }">
      <!-- FIXME this is giving you horizontal scroll on mobile since these rows are outside of a container✅ -->
      <div class="hero-text align-items-end row d-flex justify-content-start">
        <h5 class="col-6">{{ slide.header }}</h5>
        <p class="col-8">{{ slide.subheader }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.hero-container {
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  padding: 0;
  margin-inline: 0;
  display: block;
}

@media (max-width: 375px) {
  .hero-container {
    display: none;
  }
}

.slide {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity .4s ease-in-out;
}

.active {
  opacity: 1;
}

.hero-text {
  position: absolute;
  bottom: 0px;
  left: 60px;
  color: white;
  text-shadow: 1px 1px 1px black;
}

.hero-text h5 {
  margin-bottom: 0.5rem;
}
</style>