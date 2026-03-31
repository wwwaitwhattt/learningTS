<script setup lang="ts">
import type { User } from '~/types/User'

defineProps<{ user: User }>()

const emit = defineEmits<{
  (e: 'event'): void
}>()
</script>

<template>
  <div>
    <h3>{{ user.name }}</h3>
    <h3>{{ user.email }}</h3>
    <h3>{{ user.isActive ? 'active' : 'unactive'}}</h3>
  </div>

  <div>
    <p>родительский компонент передает функционал кнопки, почти ничем не отличается от JS</p>
    <button @click="emit('event')">кнопка с эмитом</button>
  </div>
</template>

<style scoped>

</style>