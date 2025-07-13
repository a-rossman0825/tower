<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)

</script>

<template>
  <div class="text-center container mt-5 text-light">
    <div v-if="account" class="row">
      <div class="col-12 text-start ms-5">
        <img :src="account.picture" :alt="`${account.name}'s profile picture'`" class="profile-img col-4">
        <div class="col-8 d-inline-block align-middle ms-4">
          <h5>{{ account.name }}</h5>
          <p class="text-secondary">0 events <i class="mdi mdi-circle-small"></i> 0 tickets</p>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">

.profile-img {
  border-radius: 50%;
  box-shadow: 1px 1px 2px black;
  border: 2px solid white;
  width: 100px;
  height: 100px;
}
</style>
