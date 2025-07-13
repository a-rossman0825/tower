<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { ticketsService } from '@/services/TicketsService.js';
import { logger } from '@/utils/Logger.js';
import UpcomingEventCard from '@/components/UpcomingEventCard.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';


const account = computed(() => AppState.account);
const ticketedEvents = computed(() => AppState.ticketedEvents);
const createdEvents = computed(() => AppState.towerEvents.filter(event => event.creatorId == account.value?.id));
const attendingEvents = computed(() => AppState.ticketedEvents);

onMounted(() => {
  getTicketedEvents();
  getAllEvents();
})

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
          <p class="text-secondary"> {{createdEvents.length}} events <i class="mdi mdi-circle-small"></i> {{ attendingEvents.length }} tickets</p>
        </div>
      </div>
    </div>
    <div class="row">
      <h5>Your Events</h5>
      <div v-for="ticketedEvent in ticketedEvents" :key="ticketedEvent.id" class="row">
        <UpcomingEventCard :towerEvent="ticketedEvent.event"/>
      </div>
    </div>
    <div class="row">
      <h5>Your Upcoming Events</h5>
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
