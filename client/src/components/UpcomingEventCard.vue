<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';


defineProps({
  towerEvent: { type: TowerEvent, required: true },
})

</script>


<template>
  <div v-if="towerEvent" class="row position-relative cover-img">
    <img :src="towerEvent.coverImg" :alt="`cover image for the ${towerEvent.name} event`" class="img-fluid w-100 cover-img">
    <div class="col-2 type-wrapper position-absolute text-center" :class="`bg-${towerEvent.eventEmojiBG}`">
      <i :class="`mdi mdi-${towerEvent.eventEmoji} text-light fs-4`"></i>
    </div>
  </div>
  <div class="text-light">
    <h5 class="mt-3">{{ towerEvent.name }}</h5>
    <!-- TODO Change text color if User is Host -->
    <span>{{ towerEvent.startDate.toLocaleDateString() }} - {{ towerEvent.location }}</span>
    <p>{{ towerEvent.capacity }} attending</p>
    <div class="row align-items-bottom justify-content-start">
      <img :src="towerEvent.creator.picture" :alt="`${towerEvent.creator.name}'s profile picture`" class="col-1 profile-img">
      <p class="text-success col-9">Hosted by {{ towerEvent.creator.name }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>

.cover-img {
  min-height: 300px;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10%;
}

.type-wrapper {
  top: 0;
  right: 12px;
  border-bottom-left-radius: 35%;
  border-top-right-radius: 35%;
  background-color: black;
}

.profile-img {
  width: 55px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

</style>