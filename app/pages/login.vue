<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('test@test.com')
const password = ref('123456')

async function handleLogin(): Promise<void> {
  await authStore.login(email.value, password.value)
}

watch(
    () => authStore.isAuthenticated,
    (isAuthenticated) => {
      if (isAuthenticated) {
        router.push('/tasks')
      }
    },
)
</script>

<template>
  <div>
    <h1>Логин</h1>

    <form class="form" @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Пароль" />

      <button type="submit" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Входим...' : 'Войти' }}
      </button>

      <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
    </form>

    <p>Тестовый пользователь:</p>
    <p>email: test@test.com</p>
    <p>password: 123456</p>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 300px;
}

.error {
  color: red;
}
</style>