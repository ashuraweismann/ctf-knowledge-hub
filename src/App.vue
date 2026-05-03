<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"

</script>

<template>
  <div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen transition-colors">
    
    <Navbar />

    
    <router-view />


    <Footer />

    
    <LoginView v-if="$route.path === '/login'" />

  </div>
</template>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
