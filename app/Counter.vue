<script setup lang="ts">
import { ref } from 'vue'

const count = ref<number>(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}

</script>

<template>
  <div>
    <p>обычный счетчик, с реактивным значением ref</p>
    <h1>counter {{ count }}</h1>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">reset</button>
  </div>
</template>

<style scoped>

</style>