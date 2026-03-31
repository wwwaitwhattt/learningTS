<script setup lang="ts">
import type { User } from '~/types/User'
import Daughter from "~/Daughter.vue";
import {ref} from "vue";

const user: User = {
  id: 1,
  name: 'Michael Scott',
  email: 'dundermifflin@das.com',
  isActive: true,
}

const clickCount = ref(0)

const handleClick = () => {
  clickCount.value++
}

</script>

<template>
  <p>Тут я создаю в родительском компоненте объект типа User (User.ts)</p>
  <p>и затем передаю этот объект в дочерний компонент пропсом</p>
  <p>а в дочернем принимаю пропс через defineProps (ожидает объект user типа User)</p>
  <p><b>наблюдение:</b> если передавать объект, в дочернем компоненте обязательно нужно указать, что ожидается именно ОБЪЕКТ типа User</p>
  <p>если оставить defineProps<.User.>, то дочерний объект будет ожидать все поля типа User по отдельности</p>
  <Daughter :user="user" @event="handleClick" />
  <p>click counter: {{ clickCount }}</p>
  <hr>
</template>

<style scoped>

</style>