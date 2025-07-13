<script setup>
import { AppState } from '@/AppState.js';
import { TowerEvent } from '@/models/TowerEvent.js';
import { computed } from 'vue';

const account = computed(()=> AppState.account);

defineProps({
  towerEvent: { type: TowerEvent, required: true },
})

</script>


<template>
  <RouterLink :to="{ name: 'Tower Event Details', params: { towerEventId: towerEvent.id }}">
    <div v-if="towerEvent" class="position-relative cover-img card-gallery">
      <img :src="towerEvent.coverImg" :alt="`cover image for the ${towerEvent.name} event`" class="img-fluid w-100 cover-img my-card">
      <div class="col-2 type-wrapper position-absolute text-center" :class="`bg-${towerEvent.eventEmojiBG}`">
        <i :class="`mdi mdi-${towerEvent.eventEmoji} text-light fs-4 ms-3 ms-md-2 ms-lg-3`"></i>
      </div>
    </div>
    <div class="text-light event-subtext">
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


.type-wrapper {
  top: 0;
  right: 0px;
  border-bottom-left-radius: 95%;
  border-top-right-radius: 25%;
  background-color: black;
}

.profile-img {
  width: 55px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

</style>