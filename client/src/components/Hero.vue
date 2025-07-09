<script setup>
import { onMounted, ref } from 'vue';


onMounted(() => {
  setInterval(() => {
    currentSlideIndex.value++;
    if (currentSlideIndex.value >= 3) {
      currentSlideIndex.value = 0;
    }
  }, 13000);
})

const currentSlideIndex = ref(0);
const slides = [
  {
    imgUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D',
    header: 'More Music for You, More Processing Fees for Us',
    subheader: 'Getting scammed out of 200% the original ticket price for a concert has never been easier than it is with Tower. Now, instead of waiting in line for tickets at a booth all day, you can stay home, kick back your feet, and watch us drain your bank account in real time.'
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1545056453-f0359c3df6db?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym93bGluZ3xlbnwwfHwwfHx8MA%3D%3D',
    header: "What Do You Mean You Didn't Save Your Ticket In Your Apple Wallet?",
    subheader: 'Now you have to sit there awkwardly with a line of people behind you trying to get into the Winnemucca First Intermediate Bowling Tournament, while you dig through your email 6 months back looking for that ticket receipt... Nice, dude.'
  },
  {
    imgUrl: 'https://images.unsplash.com/photo-1631885629112-7c9f22447ee1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fHBlb3BsZSUyMGF0JTIwYSUyMHBhcnR5fGVufDB8fDB8fHww',
    header: 'Get Out and Find Some Friends, You Dweeb',
    subheader: 'With Tower you can finally find meet & greets or "creepy dude that stands in the corner at parties" conventions where you might be able to meet someone that actually likes your off-putting demeanor (probably not, though).'
  }
]

</script>


<template>
<div class="wrapper">
  <div v-for="(slide, index) in slides" :key="index" class="slide" :style="{ backgroundImage: `url(${slide.imgUrl})` }" :class="{ active: index === currentSlideIndex }">
    <div class="hero-text align-items-end row d-flex justify-content-start">
      <h5 class="col-6">{{ slide.header }}</h5>
      <p class="col-8">{{ slide.subheader }}</p>
    </div>
  </div>
</div>
</template>


<style lang="scss" scoped>
  
  .wrapper {
    position: relative;
    width: 110%;
    height: 50vh;
    overflow: hidden;
    padding: 0;
    margin-inline: 0;
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

  .slide.active {
    opacity: 1;
  }

  .hero-text {
    position: absolute;
    bottom: 0px;
    left: 20px;
    color: white;
    text-shadow: 1px 1px 1px black;
  }

  .hero-text h5 {
    margin-bottom: 0.5rem;
  }


</style>