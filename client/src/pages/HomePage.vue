<script setup >
import Hero from '@/components/Hero.vue';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';

onMounted(() => {
  getTowerEvents();
})

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
    <h4 class="text-light mt-3 ms-4">Upcoming events</h4>
    
  </section>
</template>

<style scoped lang="scss">

</style>
