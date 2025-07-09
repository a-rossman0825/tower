<script setup>
import { Account } from '@/models/Account.js';
import { TowerEvent } from '@/models/TowerEvent.js';


defineProps({
  towerEvent: { type: TowerEvent, required: true },
})

</script>


<template>
  <div v-if="towerEvent" class="row position-relative cover-img">
    <img :src="towerEvent.coverImg" :alt="`cover image for the ${towerEvent.name} event`" class="img-fluid w-100">
    <div class="col-2 type-wrapper position-absolute text-center" :class="`bg-${towerEvent.eventEmojiBG}`">
      <i :class="`mdi mdi-${towerEvent.eventEmoji} text-light fs-4`"></i>
    </div>
  </div>
  <div class="text-light">
    <h5 class="mt-2">{{ towerEvent.name }}</h5>
    <!-- TODO Change text color if User is Host -->
    <p class="text-success">Hosted by {{ towerEvent.creator.name }}</p>
    <p>{{ towerEvent.startDate.toLocaleDateString() }} - {{ towerEvent.location }}</p>
    <p>{{ towerEvent.capacity }} attending</p>
  </div>
</template>


<style lang="scss" scoped>

img {
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

</style>