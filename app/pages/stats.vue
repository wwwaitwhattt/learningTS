<template>
  <div>
    <h1>Статистика</h1>

    <p>Всего задач: {{ tasksStore.taskCount }}</p>
    <p>Todo: {{ tasksStore.todoCount }}</p>
    <p>In progress: {{ tasksStore.inProgressCount }}</p>
    <p>Done: {{ tasksStore.doneTasksCount }}</p>
    <p>Высокий приоритет: {{ tasksStore.highPriorityTasks.length }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTasksStore } from '../stores/tasks'

const tasksStore = useTasksStore()

onMounted(async () => {
  if (!tasksStore.items.length) {
    await tasksStore.fetchTasks()
  }
})
</script>