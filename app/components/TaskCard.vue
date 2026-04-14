<script setup lang="ts">
import { useTagsStore } from '../stores/tags'
import type { Task, TaskStatus } from '../types/task'

interface Props {
  task: Task
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', task: Task): void
  (e: 'delete', id: string): void
  (e: 'change-status', payload: { id: string; status: TaskStatus }): void
}>()

const tagsStore = useTagsStore()

function getNextStatus(status: TaskStatus): TaskStatus {
  if (status === 'todo') return 'in_progress'
  if (status === 'in_progress') return 'done'
  return 'todo'
}

function handleNextStatus(): void {
  emit('change-status', {
    id: props.task.id,
    status: getNextStatus(props.task.status),
  })
}
</script>

<template>
  <div class="card">
    <h3>{{ task.title }}</h3>
    <p>{{ task.description }}</p>

    <p>Статус: {{ task.status }}</p>
    <p>Приоритет: {{ task.priority }}</p>
    <p>Обновлено: {{ new Date(task.updatedAt).toLocaleString() }}</p>

    <div class="tags">
      <span
          v-for="tagId in task.tagIds"
          :key="tagId"
          class="tag"
      >
        {{ tagsStore.getTagById(tagId)?.label }}
      </span>
    </div>

    <div class="actions">
      <button
          @click="$emit('edit', task)"
      >
        Редактировать
      </button>
      <button
          @click="$emit('delete', task.id)"
      >
        Удалить
      </button>
      <button
          @click="handleNextStatus"
      >
        Сменить статус
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 12px;
}

.tags {
  display: flex;
  gap: 6px;
  margin: 8px 0;
}

.tag {
  padding: 4px 8px;
  background: #eee;
  border-radius: 8px;
}

.actions {
  display: flex;
  gap: 8px;
}
</style>