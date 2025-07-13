<script setup>
import { AppState } from '@/AppState.js';
import { TowerEvent } from '@/models/TowerEvent.js';
import { ticketsService } from '@/services/TicketsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const account = computed(()=> AppState.account);
const isCreator = computed(() => props.towerEvent.creatorId == account.value?.id);
const isAttending = computed(() => {
  return AppState.ticketedEvents.some(event => event.event.id == props.towerEvent.id);
})

const props = defineProps({
  towerEvent: { type: TowerEvent, required: true },
})

async function unattend() {
  try {
    const ticket= AppState.ticketedEvents.find(event => event.event.id == props.towerEvent.id);
    if (!ticket) return Pop.error('You\'re not attending this event!');

    await ticketsService.deleteTicket(ticket.id);
    AppState.ticketedEvents = AppState.ticketedEvents.filter(event => event.id !== ticket.id);
    Pop.success("You are no longer attending this event!");
  } catch (error) {
    logger.error("failed to unattend", error);
    Pop.error("could not remove your ticket.");
  }
}

</script>


<template>
  <RouterLink :to="{ name: 'Tower Event Details', params: { towerEventId: towerEvent.id }}">
    <div v-if="towerEvent" class="position-relative cover-img card-gallery">
      <img :src="towerEvent.coverImg" :alt="`cover image for the ${towerEvent.name} event`" class="img-fluid w-100 cover-img my-card">
      <div class="col-2 type-wrapper position-absolute text-center" :class="`bg-${towerEvent.eventEmojiBG}`">
        <i :class="`mdi mdi-${towerEvent.eventEmoji} text-light fs-4 ms-3 ms-md-2 ms-lg-3`"></i>
      </div>
      <div v-if="account" class="col-2 attending-wrapper position-absolute text-center bg-success text-dark" :class="{'bg-success': isAttending, 'bg-primary': isCreator, 'bg-secondary': !isCreator && !isAttending}">
        <p v-if="isAttending && !isCreator" class="fs-5 ms-3 ms-md-2 ms-lg-3" role="button" selectable @click.prevent="unattend">Unattend</p>
        <p v-else-if="isCreator" class="fs-5 ms-3 ms-md-2 ms-lg-3">Creator</p>
        <p v-else class="fs-5 ms-3 ms-md-2 ms-lg-3">Not Attending</p>
      </div>
    </div>
    <div v-if="towerEvent.creator" class="text-light event-subtext">
      <h5 class="mt-3">{{ towerEvent.name }}</h5>
      <span>{{ towerEvent.startDate.toLocaleDateString() }} - {{ towerEvent.location }}</span>
      <p>{{ towerEvent.ticketCount }} attending</p>
      <div class="row align-items-bottom justify-content-start">
        <img :src="towerEvent.creator.picture" :alt="`${towerEvent.creator.name}'s profile picture`" class="col-1 profile-img">
        <p v-if="towerEvent.creator.name !== account?.name" class="text-success col-9 creator-name">Hosted by {{ towerEvent.creator.name }}</p>
        <p v-else class="creator-name text-primary col-9">Hosted by {{ towerEvent.creator.name }}</p>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>

a {
  text-decoration: none;
}

.cover-img {
  min-height: 310px;
  max-height: 310px;
  object-fit: cover;
  border-radius: 5%;

  &:hover {
    box-shadow: 1px 1px 4px white;
    transform: translate3d(0.5px, 0.5px, 0.5px);
  }
  &:active {
    box-shadow: 1px 1px 5px black;
    transform: translate3d(-0.5px, -0.5px, -0.5px);
  }
}

.creator-name:hover {
  text-decoration: underline;
}

.selectable {
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: white;
  }
}


.type-wrapper {
  top: 0;
  right: 0px;
  border-bottom-left-radius: 95%;
  border-top-right-radius: 25%;
  background-color: black;
}

.attending-wrapper {
  top: 0;
  left: 0;
  border-bottom-right-radius: 20%;
  border-top-left-radius: 25%;
  height: 30px;
  width: 100px;

}

.profile-img {
  width: 55px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

</style>