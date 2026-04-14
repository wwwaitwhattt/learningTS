<script setup lang="ts">
import TaskCard from './TaskCard.vue'
import type { Task, TaskStatus } from '../types/task'

interface Props {
  tasks: Task[]
}

defineProps<Props>()

defineEmits<{
  (e: 'edit', task: Task): void
  (e: 'delete', id: string): void
  (e: 'change-status', payload: { id: string; status: TaskStatus }): void
}>()
</script>

<template>
  <div>
    <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
        @change-status="$emit('change-status', $event)"
    />
  </div>
</template>