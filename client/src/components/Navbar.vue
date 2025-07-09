<script setup>
import Login from './Login.vue';



</script>

<template>
  <nav class="navbar navbar-expand-md navbar-bg">
    <div class="container gap-2 position-relative">
      <RouterLink :to="{ name: 'Home' }" class="d-flex align-items-center text-light">
        <img class="navbar-brand position-absolute" alt="logo" src="../assets/img/tower-logo.svg" height="65" />
        <b class="fs-5">Tower</b>
      </RouterLink>
      <div>
        <!-- LOGIN COMPONENT HERE -->
        <div>
        </div>
        <Login />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

b {
  margin-left: 4rem;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-bg {
  background-color: rgba(33, 31, 31, .50);
  backdrop-filter: blur(2px);
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.position-absolute {
  top: -8px;
  z-index: 2;
}
</style>
