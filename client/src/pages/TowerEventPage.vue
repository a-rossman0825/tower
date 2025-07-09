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
    <div class="row">
      
    </div>
  </section>
</template>


<style lang="scss" scoped>

</style>