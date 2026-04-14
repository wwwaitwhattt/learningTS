<script setup lang="ts">
const authStore = useAuthStore()

authStore.initAuth()

function handleLogout(): void {
  authStore.logout()
  navigateTo('/login')
}
</script>

<template>
  <header class="header">
    <nav class="nav" v-if="authStore.isAuthenticated">
      <NuxtLink to="/tasks">Задачи</NuxtLink>
      <NuxtLink to="/stats">Статистика</NuxtLink>
    </nav>

    <div v-if="authStore.isAuthenticated" class="user-block">
      <span>{{ authStore.user?.name }}</span>
      <button @click="handleLogout">Выйти</button>
    </div>
  </header>
</template>