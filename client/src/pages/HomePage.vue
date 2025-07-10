<script setup >
import { AppState } from '@/AppState.js';
import CategoryCard from '@/components/CategoryCard.vue';
import Hero from '@/components/Hero.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import TowerEventForm from '@/components/TowerEventForm.vue';
import UpcomingEventCard from '@/components/UpcomingEventCard.vue';
import { AuthService } from '@/services/AuthService.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

onMounted(() => {
  getTowerEvents();
})

const identity = computed(() => AppState.identity);
function login() {
  AuthService.loginWithRedirect()
}

const towerEvents = computed(() => {
  if (activeCategory.value == 'all') {
    return AppState.towerEvents;
  }
  return AppState.towerEvents.filter(towerEvent => towerEvent.type == activeCategory.value)
});

async function getTowerEvents() {
  try {
    await towerEventsService.getTowerEvents();
  }
  catch (error){
    Pop.error(error);
    logger.error('Could not get events', error);
  }
}

const activeCategory = computed(() => AppState.activeCategory);
const account = computed(() => AppState.account);

</script>

<template>
  <!-- SECTION HERO LANDING CAROUSEL -->
  <section>
    <Hero />
  </section>
  <!-- !SECTION -->

  <!-- SECTION HOW IT WORKS DISCOVER/CREATE BUTTONS -->
  <section class="container mt-5">
    <h4 class="text-light mt-md-5 mb-4 fw-bold">How Tower Works</h4>
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
      <div v-if="account" class="col-10 col-md-4 works-card rounded ms-md-5">
        <div class="row" role="button" data-bs-toggle="modal" data-bs-target="#towerEventModal">
          <div class="col-2 mt-2">
            <i class="mdi mdi-plus text-primary display-3"></i>
          </div>
          <div class="col-9 mt-4">
            <h5>Start an event to invite your friends</h5>
            <span>Create your own Tower Event, and draw from a community of millions</span>
            <p role="button" class="text-success">Create an Event</p>
          </div>
        </div>
      </div>
      <div v-else class="col-10 col-md-4 works-card rounded ms-md-5">
        <div class="row" role="button" @click="login" v-if="!identity">
          <div class="col-2 mt-2">
            <i class="mdi mdi-login text-primary display-3"></i>
          </div>
          <div class="col-9 mt-4">
            <h5>Login to Start an event and invite your friends!</h5>
            <p>You Can Create your own Tower Event, and draw from a community of millions</p>
            <div class="row text-center justify-content-center me-5">
              <p role="button" class=" col-6 text-success">
                Login Here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- !SECTION -->

  <!-- SECTION CATEGORY FILTER CARDS -->
  <section class="container mt-5">
    <h4 class="text-light mb-4 mt-5 fw-bold">Explore Top Categories</h4>
    <div class="row bg-secondary pt-5 pb-5 rounded">
      <CategoryCard />
    </div>
  </section>
  <!-- !SECTION -->
  <!-- SECTION UPCOMING EVENTS CARDS  -->
  <section class="container mt-5">
    <h4 class="text-light mt-5 mb-3 fw-bold">Upcoming Events</h4>
    <div class="row justify-content-center">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 col-sm-6 mb-5">
        <UpcomingEventCard :towerEvent />
      </div>
    </div>
  </section>
  <!-- !SECTION -->

  <ModalWrapper modalId="towerEventModal" modalHeader="Create an Event">
    <TowerEventForm />
  </ModalWrapper>
</template>

<style scoped lang="scss">

a {
  text-decoration: none;
  color: white;
  cursor: pointer;
}

i {
  text-shadow: 1px 1px 2px white;
}

.works-card {
  background-color: #696969;
  text-shadow: 1px 1px 5px black;
  &:hover {
    box-shadow: 1px 1px 4px white;
    transform: translate3d(0.5px, 0.5px, 0.5px);
    cursor: pointer;
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
