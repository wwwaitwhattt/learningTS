<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useTagsStore } from '../stores/tags'
import type { Task, TaskFormValues } from '../types/task'

interface Props {
  task: Task | null
  submitText: string
}

const props = withDefaults(defineProps<Props>(), {
  task: null,
  submitText: 'Сохранить',
})

const emit = defineEmits<{
  (e: 'submit', value: TaskFormValues): void
  (e: 'cancel'): void
}>()

const tagsStore = useTagsStore()

const form = reactive<TaskFormValues>({
  title: '',
  description: '',
  priority: 'medium',
  tagIds: [],
})

watch(
    () => props.task,
    (task) => {
      if (task) {
        form.title = task.title
        form.description = task.description
        form.priority = task.priority
        form.tagIds = [...task.tagIds]
      } else {
        form.title = ''
        form.description = ''
        form.priority = 'medium'
        form.tagIds = []
      }
    },
    { immediate: true },
)

function handleSubmit(): void {
  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim(),
    priority: form.priority,
    tagIds: form.tagIds,
  })
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <input v-model="form.title" placeholder="Название" />
    <textarea v-model="form.description" placeholder="Описание" />

    <select v-model="form.priority">
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
    </select>

    <div>
      <label v-for="tag in tagsStore.items" :key="tag.id" class="tag-option">
        <input v-model="form.tagIds" type="checkbox" :value="tag.id" />
        {{ tag.label }}
      </label>
    </div>

    <div class="actions">
      <button type="submit">{{ submitText }}</button>
      <button type="button" @click="$emit('cancel')">Отмена</button>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.actions {
  display: flex;
  gap: 8px;
}

.tag-option {
  display: inline-flex;
  margin-right: 8px;
}
</style>