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
  <section>
    <Hero />
  </section>
  <section class="container">
    <h4 class="text-light mt-5 mb-3">Upcoming events</h4>
    <div class="row justify-content-center">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 col-6 mb-4">
        <UpcomingEventCard :towerEvent />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
