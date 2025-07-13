<script setup>
import { AppState } from '@/AppState.js';
import { commentsService } from '@/services/CommentsService.js';
import { ticketsService } from '@/services/TicketsService.js';
import { towerEventsService } from '@/services/TowerEventsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const towerEvent = computed(() => AppState.towerEvent);
const account = computed(() => AppState.account);
const ticketProfiles = computed(() => AppState.ticketProfiles);
const comments = computed(() => AppState.comments);

let editBtns = ref(false);

const editableCommentData = ref({ body: '',eventId: route.params.towerEventId });

const isAttending = computed (() => {
  const accountId = AppState.account?.id;
  const myTicket = AppState.ticketProfiles.find(ticket => accountId == ticket.accountId);
  if (!myTicket) {
    return false;
  } else {
    return true;
  }
})



onMounted(() => {
  getTowerEventById();
  getTicketsByEventId();
  getCommentsByAlbumId();
})

async function getTowerEventById() {
  try {
    const towerEventId = route.params.towerEventId;
    await towerEventsService.getTowerEventById(towerEventId);
  }
  catch (error) {
    Pop.error(error);
    logger.error('Could Not Get event by ID - TowerEventPage', error);
  }
}

async function getTicketsByEventId() {
  try {

    const eventId = route.params.towerEventId;
    await ticketsService.getTicketsByEventId(eventId);

  }
  catch (error) {
    Pop.error(error);
  }
}



async function cancelTowerEvent() {

  const confirmed = await Pop.confirm(`Are You sure you want to ${towerEvent.value.isCanceled ? 'Uncancel' : 'Cancel'} your "${towerEvent.value.name}" event?`, '', 'Yes', 'No');

  if (!confirmed) return;

  try {
    const towerEventId = route.params.towerEventId;
    await towerEventsService.cancelTowerEvent(towerEventId);
  }
  catch (error) {
    Pop.error(error);
    logger.error('Could not Cancel Event!', error);
  }
}

async function createTicket() {
  try {
    const ticketData = { eventId: route.params.towerEventId };
    await ticketsService.createTicket(ticketData);
  }
  catch (error) {
    Pop.error(error);
    logger.error('Could not create ticket!', error);
  }
}

async function getCommentsByAlbumId() {
  try {
    const eventId = route.params.towerEventId;
    await commentsService.getCommentsByEventId(eventId);
  }
  catch (error) {
    Pop.error(error);
  }
}

async function createComment() {
  try {
    await commentsService.createComment(editableCommentData.value);
    editableCommentData.value.body = '';
  }
  catch (error) {
    Pop.error(error);
    logger.error('Could not create Comment', error);
    
  }
}

async function deleteComment(commentId) {
  const confirmed = await Pop.confirm('Are you sure you want to delete your comment?');

  if (!confirmed) return

  try {
    logger.log('deleting comment', commentId);
      await commentsService.deleteComment(commentId);
  }
  catch (error){
    Pop.error('could not delete comment', error);
  }
}

function toggleEditBtns() {
  editBtns.value = !editBtns.value;
}





</script>


<template>
  <section v-if="towerEvent" class="container text-light">
    <div class="row mt-3 justify-content-end">
      <div v-if="account?.id == towerEvent?.creatorId" class="col-1 position-relative text-end">
        <p role="button" @click="toggleEditBtns()"><i class="mdi mdi-dots-horizontal-circle-outline fs-4"></i></p>
        <span v-if="editBtns" class="edit-btn position-absolute">edit</span>
        <p role="button" @click="cancelTowerEvent()" v-if="editBtns && !towerEvent.isCanceled"
          class="cancel-btn position-absolute">cancel</p>
        <p role="button" @click="cancelTowerEvent()" v-if="editBtns && towerEvent.isCanceled"
          class="cancel-btn position-absolute">uncancel</p>
      </div>
    </div>
    <div class="row justify-content-center rounded cover-img-wrapper">
      <div class=" cover-img img-fluid w-75" :style="{ backgroundImage: `url(${towerEvent.coverImg})` }">
        <div class="row justify-content-center inner-wrapper">
          <div class="col-9">
            <img :src="towerEvent.coverImg" class="inner-image w-100" :alt="`${towerEvent.name} cover image`" />
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-1 mt-lg-5 text-center text-lg-start">
      <div class="col-12 col-lg-7">
        <div class="row">
          <div>
            <div
              class="row align-items-center text-center text-lg-start justify-content-center justify-content-lg-start">
              <h2 class="col-lg-8 order-2 order-lg-1">{{ towerEvent.name }}</h2>
              <div
                :class="`text-center ms-2 mb-3 order-1 order-lg-2 col-8 col-md-4 col-lg-3 rounded-pill px-1 bg-${towerEvent.emojiBG}`">
                {{ towerEvent.type }}</div>
            </div>
            <p>{{ towerEvent.description }}</p>
            <h5>Date and Time</h5>
            <p>
              <i class="mdi mdi-calendar-clock fs-3 text-primary"></i>
              Starts {{ towerEvent.startDate.toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day:
                  'numeric'
              }) }} at {{ towerEvent.startDate.toLocaleTimeString('en-US', {
                hour: 'numeric', minute:
                  '2-digit', hour12: true, timeZoneName: 'short'
              }) }}
            </p>
            <h5>Location</h5>
            <p>
              <i class="mdi mdi-map-marker fs-3 text-primary"></i>
              {{ towerEvent.location }}
            </p>
          </div>
        </div>
        <!-- SECTION COMMENTS -->
        <div class="row mt-5 mb-4 text-start justify-content-start bg-secondary rounded mx-1">
          <div class="col-10">
            <h5 class="mt-3 mb-2">Comments</h5>
          </div>
          <form @submit.prevent="createComment()" class="justify-content-center text-center">
            <textarea v-model="editableCommentData.body" type="text" class="col-12 rounded" name="post-comment" id="post-comment"
              maxlength="500" placeholder="Speak Your Mind!" required></textarea>
            <div class="row justify-content-end me-1">
              <button type="submit" class="col-2 rounded btn btn-primary mb-3 mt-2">Share</button>
            </div>
          </form>
          <div v-for="comment in comments" :key="comment.id" class="text-light row justify-content-center">
            
            <div class="col-11 mb-4 bg-dark py-2 rounded">
              <div v-if="comment.creatorId == account.id" class="row justify-content-end me-2">
                <div @click="deleteComment(comment.id)" role="button" class="col-1">
                  <i class="mdi mdi-dots-horizontal-circle-outline"></i>
              </div>
            </div>
              <img :src="comment.creator.picture" alt="alt text" class="profile-img-comments">
              <span class="ms-3 text-secondary">{{ comment.creator.name }}</span>
              <p class="col-10 ms-5">{{ comment.body }}</p>
            </div>
          </div>
        </div>
        <!-- !SECTION -->
      </div>
      <div class="col-10 col-md-6 col-lg-2">
        <div v-if="towerEvent.isCanceled == true"
          class="row justify-content-center text-center bg-secondary rounded py-4 px-2 text-shadow">
          <h5>This Event Has Been Cancelled</h5>
          <p>Ticket Sales Have Ended</p>
          <div class="col-4 col-lg-10 dead-btn">
            <button type="button" class="btn btn-info col-12 text-danger text-center disabled">Canceled</button>
          </div>
        </div>
        <div v-else-if="towerEvent.ticketCount == towerEvent.capacity"
          class="row justify-content-center text-center bg-secondary rounded py-4 px-2 text-shadow dead-btn">
          <h5>This Event Has Sold Out!</h5>
          <p>Ticket Sales Have Ended</p>
          <div class="col-4 col-lg-10 dead-btn">
            <button type="button" class="btn btn-info col-12 text-danger text-center disabled">Sold Out</button>
          </div>
        </div>
        <div v-else class="row justify-content-center text-center bg-secondary rounded py-4 px-2 text-shadow">
          <div v-if="!isAttending">
            <h5>Interested in going?</h5>
            <p>Grab a ticket!</p>
            <button @click="createTicket()" type="button" class="btn btn-info col-6">
              Attend
            </button>
          </div>
          <div v-else>
            <h5 class="text-success">You Already Have a Ticket!</h5>
            <p>Need More?</p>
            <button @click="createTicket()" type="button" class="btn btn-info col-6">
              Buy More Tickets
            </button>
          </div>
          
        </div>
        <div class="row text-end">
          
          <p><span :class="`text-${towerEvent.attendeeColor}`">{{ towerEvent.capacity - towerEvent.ticketCount }}</span>
            spots left</p>
        </div>
        <div class="row bg-secondary rounded text-shadow">
          
          <div class="row py-4 text-center justify-content-start">
            <h5 class="fw-bold mb-3 fs-4">Attendees</h5>
            <div v-for="(ticketProfile) in ticketProfiles" :key="ticketProfile.id" class="col-12 mb-2">
              <img :src="ticketProfile.profile.picture" class="profile-img img-fluid col-4">
              <span class="col-8 ms-2">{{ ticketProfile.profile.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.profile-img {
  border-radius: 50%;
  width: 25px;
  height: 25px;
}

.profile-img-comments {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.cover-img {
  object-fit: cover;
  border-radius: 20px;
}

.inner-img {
  object-fit: cover;
  max-height: 80px;
}

.text-shadow {
  text-shadow: 1px 1px 1px black;
}

.inner-wrapper {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 20px;
}



.cancel-btn {
  top: 30px;
  right: 12px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.edit-btn {
  top: 50px;
  right: 12px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.mdi-dots-horizontal-circle-outline:hover {
  cursor: pointer;
  text-shadow: 1px 1px 2px whitesmoke;
}

.mdi-dots-horizontal-circle-outline:active {
  text-shadow: 1px 1px 2px black;
}

.dead-btn:hover {
  cursor: not-allowed;
}
</style>