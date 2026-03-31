<script setup lang="ts">
import {reactive} from "vue";

interface FormData {
  name: string;
  surname: string;
  age: number;
}

const formData = reactive<FormData>({
  name: '',
  surname: '',
  age: 0,
});
</script>

<template>
  <div>
    <p>здесь используется reactive объект типа <.FormData.> с данными формы, который изменяется вместе с полями</p>
    <input type="text" v-model="formData.name">
    <input type="text"  v-model="formData.surname">
    <input type="number" v-model="formData.age">
    <pre>{{ formData }}</pre>
  </div>
</template>