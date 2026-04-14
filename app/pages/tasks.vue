<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TaskForm from '~/components/TaskForm.vue'
import TaskList from '~/components/TaskList.vue'
import { useTasksStore } from '~/stores/tasks'
import { useTagsStore } from '~/stores/tags'
import type { Task, TaskFormValues, TaskStatus } from '~/types/task'

definePageMeta({
  middleware: 'auth',
})

const tasksStore = useTasksStore()
const tagsStore = useTagsStore()

const showForm = ref(false)
const editingTask = ref<Task | null>(null)

onMounted(async () => {
  tagsStore.initTags()
  tasksStore.initTasks()

  await tagsStore.fetchTags()
  await tasksStore.fetchTasks()
})

function openCreateForm(): void {
  editingTask.value = null
  showForm.value = true
}

function closeForm(): void {
  editingTask.value = null
  showForm.value = false
}

function handleEdit(task: Task): void {
  editingTask.value = task
  showForm.value = true
}

async function handleSubmit(values: TaskFormValues): Promise<void> {
  if (editingTask.value) {
    await tasksStore.updateTask(editingTask.value.id, values)
  } else {
    await tasksStore.createTask(values)
  }

  closeForm()
}

async function handleDelete(id: string): Promise<void> {
  await tasksStore.removeTask(id)
}

async function handleChangeStatus(payload: { id: string; status: TaskStatus }): Promise<void> {
  await tasksStore.changeStatus(payload.id, payload.status)
}
</script>

<template>
  <div>
    <h1>Задачи</h1>

    <button v-if="!showForm" @click="openCreateForm">Создать задачу</button>

    <TaskForm
        v-if="showForm"
        :task="editingTask"
        :submit-text="editingTask ? 'Обновить' : 'Создать'"
        @submit="handleSubmit"
        @cancel="closeForm"
    />

    <p v-if="tasksStore.isLoading">Загрузка...</p>
    <p v-if="tasksStore.error">{{ tasksStore.error }}</p>

    <TaskList
        :tasks="tasksStore.items"
        @edit="handleEdit"
        @delete="handleDelete"
        @change-status="handleChangeStatus"
    />
  </div>
</template>