<script setup >
import { AppState } from '@/AppState.js';
import Hero from '@/components/Hero.vue';
import UpcomingEventCard from '@/components/UpcomingEventCard.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

onMounted(() => {
  getTowerEvents();
})

const towerEvents = computed(() => AppState.towerEvents);

async function getTowerEvents() {
  try {
    await towerEventsService.getTowerEvents();
  }
  catch (error){
    Pop.error(error);
    logger.error('Could not get events', error);
  }
}

</script>

<template>
  <!-- SECTION HERO LANDING CAROUSEL -->
  <section>
    <Hero />
  </section>
  <!-- !SECTION -->

  <!-- SECTION HOW IT WORKS DISCOVER/CREATE BUTTONS -->
  <section class="container mt-5">
    <h4 class="text-light ms-5 mt-5 mb-4">How Tower Works</h4>
    <div class="row justify-content-center text-light">
      
        <a class="col-10 col-md-4 works-card rounded mb-3 mb-md-0 me-md-5">
          <div class="row">
            <div class="col-2 mt-2">
              <i class="mdi mdi-magnify text-primary display-3"></i>
            </div>
            <div class="col-9 ms-2 mt-4">
              <h5>Discover events you're interested in</h5>
              <p>Browse through community hosted events for all the things you love</p>
            </div>
          </div>
        </a>
      
      
        <div class="col-10 col-md-4 works-card rounded ms-md-5">
          <div class="row">
            <div class="col-2 mt-2">
              <i class="mdi mdi-plus text-primary display-3"></i>
            </div>
            <div class="col-9 mt-4">
              <h5>Start an event to invite your friends</h5>
              <span>Create your own Tower Event, and draw from a community of millions</span>
              <p class="text-success">Create an Event</p>
            </div>
          </div>
        </div>
      
    </div>
  </section>
  <!-- !SECTION -->
  
  <!-- SECTION UPCOMING EVENTS CARDS  -->
  <section class="container mt-5">
    <h4 class="text-light mt-5 mb-3 ms-5">Upcoming events</h4>
    <div class="row justify-content-center">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 col-sm-6 mb-5">
        <UpcomingEventCard :towerEvent />
      </div>
    </div>
  </section>
  <!-- !SECTION -->
</template>

<style scoped lang="scss">

a {
  text-decoration: none;
  color: white;
  cursor: pointer;
}

.works-card {
  background-color: #696969;
  text-shadow: 1px 1px 5px black;
  &:hover {
    box-shadow: 1px 1px 4px white;
    transform: translate3d(0.5px, 0.5px, 0.5px);
  }
  &:active {
    background-color: rgb(64, 61, 61);
    text-shadow: grey;
    color: rgb(166, 166, 166);
    box-shadow: 1px 1px 5px black;
    transform: translate3d(-0.5px, -0.5px, -0.5px);
  }
}

</style>
