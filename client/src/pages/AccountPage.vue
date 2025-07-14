<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { ticketsService } from '@/services/TicketsService.js';
import { logger } from '@/utils/Logger.js';
import UpcomingEventCard from '@/components/UpcomingEventCard.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';

const account = computed(() => AppState.account);
const createdEvents = computed(() => {
  return AppState.towerEvents.filter(event => event.creatorId == account.value?.id);
});


const drawOneEvent = computed(() => {
  const alreadyTicketed = new Set();
  return AppState.ticketedEvents
    .map(ticket => ticket.event)
    .filter(event => {
      if (!alreadyTicketed.has(event.id)) {
        alreadyTicketed.add(event.id);
        return true;
      }
      return false;
    });
});


const attendingEvents = computed(() => {
  return drawOneEvent.value.filter(event => event.creatorId !== account.value?.id);
});

onMounted(() => {
  getTicketedEvents();
  getAllEvents();
});

async function getTicketedEvents() {
  try {
    await ticketsService.getMyTicketedEvents();
  }
  catch (error){
    Pop.error(error);
    logger.error('Could not get Ticketed Events', error);
  }
}

async function getAllEvents() {
  try {
    await towerEventsService.getTowerEvents();
  }
  catch (error){
    Pop.error(error);
  }
}


</script>

<template>
  <div v-if="account" class="text-center container mt-5 text-light">
    <div class="row">
      <div class="col-12 text-start ms-5">
        <img :src="account.picture" :alt="`${account.name}'s profile picture'`" class="profile-img col-4">
        <div class="col-8 d-inline-block align-middle ms-4">
          <h5>{{ account.name }}</h5>
          <p class="text-secondary"> {{createdEvents.length}} events <i class="mdi mdi-circle-small"></i> {{ drawOneEvent.length }} tickets</p>
        </div>
      </div>
    </div>
    <div class="row">
      <h4 class="text-light mt-5 mb-3 fw-bold">Your Events</h4>
      <div class="row justify-content-center">
        <div v-for="event in createdEvents" :key="event.id" class="col-md-4 col-sm-6 mb-5">
          <UpcomingEventCard :towerEvent="event"/>
        </div>
      </div>
    </div>
    <div class="row">
      <h5 class="text-light mt-5 mb-3 fw-bold">Your Upcoming Events</h5>
      <div class="row justify-content-center">
        <div v-for="event in attendingEvents" :key="event.id" class="col-md-4 col-sm-6 mb-5">
          <UpcomingEventCard :towerEvent="event"/>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <h1>Loading... <i class="mdi mdi-duck mdi-spin"></i></h1>
  </div>
</template>

<style scoped lang="scss">

.profile-img {
  border-radius: 50%;
  box-shadow: 1px 1px 2px black;
  border: 2px solid white;
  width: 100px;
  height: 100px;
}
</style>
