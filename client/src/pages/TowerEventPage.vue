<script setup>
import { AppState } from '@/AppState.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const towerEvent = computed(() => AppState.towerEvent);

onMounted(() => {
  getTowerEventById()
})

async function getTowerEventById() {
  try {
    const towerEventId = route.params.towerEventId;
    await towerEventsService.getTowerEventById(towerEventId);
  }
  catch (error){
    Pop.error(error);
    logger.error('Could Not Get event by ID - TowerEventPage', error);
  }
}

</script>


<template>
  <section v-if="towerEvent" class="container text-light">
    <div class="row justify-content-center rounded">
      <div class=" cover-img mt-5 img-fluid w-75" :style="{ backgroundImage: `url(${towerEvent.coverImg})`}">
        <div class="row justify-content-center inner-wrapper">
          <div class="col-9">
            <img
            :src="towerEvent.coverImg"
            class="inner-image img-fluid w-100"
            :alt="`${towerEvent.name} cover image`"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-1 mt-lg-5 text-center text-lg-start">
      <div class="col-12 col-lg-7">
        <div class="row">
          <div>
            <div class="row align-items-center text-center text-lg-start justify-content-center justify-content-lg-start">
              <h2 class="col-lg-8 order-2 order-lg-1">{{ towerEvent.name }}</h2>
              <div :class="`text-center ms-2 mb-3 order-1 order-lg-2 col-8 col-md-4 col-lg-3 rounded-pill px-1 bg-${towerEvent.emojiBG}`">{{ towerEvent.type }}</div>
            </div>
            <p>{{ towerEvent.description }}</p>
            <h5>Date and Time</h5>
            <p>
              <i class="mdi mdi-calendar-clock fs-3 text-primary"></i>
              Starts {{ towerEvent.startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }} at {{ towerEvent.startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZoneName: 'short' }) }}
            </p>
            <h5>Location</h5>
            <p>
              <i class="mdi mdi-map-marker fs-3 text-primary"></i>
              {{ towerEvent.location }}
            </p>
          </div>
        </div>
      </div>
      <div class="col-10 col-md-6 col-lg-2">
        <div v-if="towerEvent.isCanceled == true" class="row justify-content-center text-center bg-secondary rounded py-4 px-2 text-shadow">
          <h5>This Event Has Been Cancelled</h5>
          <p>Ticket Sales Have Ended</p>
          <button type="button" class="btn btn-info col-4 col-md-7 col-lg-8 text-danger text-center" disabled>Canceled</button>
        </div>
        <div v-else class="row justify-content-center text-center bg-secondary rounded py-4 px-2 text-shadow">
          <h5>Interested in going?</h5>
          <p>Grab a ticket!</p>
          <button type="button" class="btn btn-info col-6">Attend</button>
        </div>
        <div class="row text-end">
          <!-- TODO Update Spots left instead of Capacity, and change text color with ticket amount -->
          <p><span class="text-success">{{ towerEvent.capacity }}</span> spots left</p>
        </div>
        <div class="row mt-5 py-4 text-start justify-content-start">
          <h5 class="fw-bold">Attendees</h5>
          <div class="row bg-secondary rounded text-shadow">
          <!-- TODO CREATE ATTENDEES LIST -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>

.cover-img {
  object-fit: cover;
  border-radius: 20px;
}

.inner-img {
  object-fit: cover;
  max-height: 100px;
}

.text-shadow {
  text-shadow: 1px 1px 1px black;
}

.inner-wrapper {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 20px;
}

</style>