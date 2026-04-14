<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <div class="app">
    <Header />
    <NuxtPage />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
</style>