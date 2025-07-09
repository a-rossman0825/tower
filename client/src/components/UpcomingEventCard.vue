<script setup>
import { TowerEvent } from '@/models/TowerEvent.js';


defineProps({
  towerEvent: { type: TowerEvent, required: true },
})

</script>


<template>
  <div v-if="towerEvent" class="row position-relative">
    <img :src="towerEvent.coverImg" :alt="`cover image for the ${towerEvent.name} event`" class="img-fluid w-100">
    <div class="col-2 type-wrapper position-absolute text-center">
      <i class="mdi mdi-guitar-electric text-light fs-4"></i>
    </div>
  </div>
  <div class="text-light">
    <h5 class="mt-2">{{ towerEvent.name }}</h5>
    <p>Hosted by {{ towerEvent.creator.name }}</p>
    <p>{{ towerEvent.startDate.toLocaleDateString() }} - {{ towerEvent.location }}</p>
    <p>{{ towerEvent.capacity }} attending</p>
  </div>
</template>


<style lang="scss" scoped>

img {
  min-height: 180px;
  object-fit: cover;
}

.type-wrapper {
  top: 0;
  right: 12px;
  background-color: black;
}

</style>