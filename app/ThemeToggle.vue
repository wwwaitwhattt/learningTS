<script setup lang="ts">
import { ref } from 'vue'

type Theme = 'light' | 'dark'
const themeType = ref<Theme>('light')

function toggleTheme() {
  return themeType.value = themeType.value === 'light' ? 'dark' : 'light'
}
</script>

<template>
<div :class="themeType">
  <p>здесь задан union тип Theme, который разрешает только 2 значения: light или dark</p>
  <p>затем через ref значение переменной, содержащей начальное значение темы, делается реактивным</p>
  <p>{{ themeType }}</p>
  <button @click="toggleTheme"> Toggle theme </button>
</div>
</template>

<style>
.light {
  background: white;
  color: black;
  border: solid 1px black;
}

.dark {
  background: black;
  color: white;
}
</style>