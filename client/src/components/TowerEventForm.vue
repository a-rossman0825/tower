<script setup>
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

  const router = useRouter();
  
  const types = ['concert', 'convention', 'sport', 'digital'];

  const editableTowerEventData = ref({
    name: '',
    description: '',
    coverImg: '',
    location: '',
    capacity: 0,
    startDate: '',
    type: '',
  })

  async function createTowerEvent() {
    try {
      const towerEventId = await towerEventsService.createTowerEvent(editableTowerEventData.value);

      editableTowerEventData.value = {
        name: '',
        description: '',
        coverImg: '',
        location: '',
        capacity: 0,
        startDate: '',
        type: '',
      }

      Modal.getOrCreateInstance('#towerEventModal').hide();

      router.push({ name: 'Tower Event Details', params: { towerEventId: towerEventId } })
    }
    catch (error){
      Pop.error(error);
      logger.error('COULD NOT CREATE EVENT -Event Form', error);
    }
  }

</script>


<template>
  <form @submit.prevent="createTowerEvent()">
    <div class="form-floating mb-3">
      <input v-model="editableTowerEventData.name" type="text" id="event-name" class="form-control" placeholder="Event Name..." min-length="3" maxlength="50" required>
      <label for="event-name">Event Name</label>
    </div>
    <div class="form-floating mb-3">
      <textarea v-model="editableTowerEventData.description" class="form-control" placeholder="Event Description..." id="event-description" minlength="15" maxlength="1000" required></textarea>
      <label for="event-description">Event Description</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableTowerEventData.coverImg" type="url" id="event-cover-img" class="form-control" minlength="1" maxlength="500" required placeholder="Event Cover Image...">
      <label for="event-cover-img">Event Cover Image</label>
    </div>
    <div class="form-floating mb-3">
      <input v-model="editableTowerEventData.location" type="text" id="event-location" class="form-control" minlength="1" maxlength="500" placeholder="Event Location..." required>
      <label for="event-location">Event Location</label>
    </div>
      <label for="event-date">Event Start Date</label>
      <input v-model="editableTowerEventData.startDate" type="date" id="event-date" class="form-control" required>
    <div class="form-floating mb-3">
      <select v-model="editableTowerEventData.type" id="event-type" aria-label="Event Type" class="form-select" required>
        <option selected disabled value="">Choose an Event Category</option>
        <option v-for="type in types" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
      <div class="form-floating mb-3">
        <input v-model="editableTowerEventData.capacity" type="number" id="event-capacity" class="form-control" min="1" maxlength="5000" placeholder="Event Capacity..." required>
        <label for="event-capacity">Event Capacity</label>
      </div>
      <label for="event-type">Choose an Event Category</label>
    </div>
    <div class="text-end">
      <button class="btn btn-success" type="submit"><i class="mdi mdi-plus text-light"></i> Add Event</button> 
    </div>
  </form>
</template>


<style lang="scss" scoped>

  textarea {
    min-height: 5rem !important;
  }
</style>