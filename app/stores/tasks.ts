import { defineStore } from 'pinia'
import type {
    CreateTask,
    Task,
    TaskStatus,
    UpdateTask,
} from '~/types/task'

interface TasksState {
    items: Task[]
    isLoading: boolean
    error: string | null
}

const TASKS_KEY = 'tasks'

const defaultTasks: Task[] = [
    {
        id: '1',
        title: 'Выучить Pinia',
        description: 'Разобраться со state, getters и actions',
        status: 'todo',
        priority: 'high',
        tagIds: ['3'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Сделать список задач',
        description: 'Вывести задачи из store',
        status: 'in_progress',
        priority: 'medium',
        tagIds: ['1'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

function loadTasks(): Task[] {
    if (import.meta.server) {
        return []
    }

    const raw = localStorage.getItem(TASKS_KEY)

    if (!raw) {
        localStorage.setItem(TASKS_KEY, JSON.stringify(defaultTasks))
        return defaultTasks
    }

    return JSON.parse(raw) as Task[]
}

function saveTasks(tasks: Task[]): void {
    if (import.meta.server) {
        return
    }

    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export const useTasksStore = defineStore('tasks', {
    state: (): TasksState => ({
        items: [],
        isLoading: false,
        error: null,
    }),

    getters: {
        taskCount(state): number {
            return state.items.length
        },

        doneTasksCount(state): number {
            return state.items.filter((task) => task.status === 'done').length
        },

        todoCount(state): number {
            return state.items.filter((task) => task.status === 'todo').length
        },

        inProgressCount(state): number {
            return state.items.filter((task) => task.status === 'in_progress').length
        },

        highPriorityTasks(state): Task[] {
            return state.items.filter((task) => task.priority === 'high')
        },
    },

    actions: {
        initTasks(): void {
            this.items = loadTasks()
        },

        async fetchTasks(): Promise<void> {
            this.isLoading = true
            this.error = null

            try {
                await new Promise((resolve) => setTimeout(resolve, 200))
                this.items = loadTasks()
            } catch (error) {
                this.error = error instanceof Error ? error.message : 'Ошибка загрузки задач'
            } finally {
                this.isLoading = false
            }
        },

        async createTask(payload: CreateTask): Promise<Task> {
            await new Promise((resolve) => setTimeout(resolve, 200))

            const now = new Date().toISOString()

            const newTask: Task = {
                id: Date.now().toString(),
                title: payload.title,
                description: payload.description,
                status: 'todo',
                priority: payload.priority,
                tagIds: payload.tagIds,
                createdAt: now,
                updatedAt: now,
            }

            this.items.push(newTask)
            saveTasks(this.items)

            return newTask
        },

        async updateTask(id: string, payload: UpdateTask): Promise<Task | null> {
            await new Promise((resolve) => setTimeout(resolve, 200))

            const currentTask = this.items.find((task) => task.id === id)

            if (!currentTask) {
                return null
            }

            const updatedTask: Task = {
                id: currentTask.id,
                createdAt: currentTask.createdAt,
                updatedAt: new Date().toISOString(),
                title: payload.title ?? currentTask.title,
                description: payload.description ?? currentTask.description,
                status: payload.status ?? currentTask.status,
                priority: payload.priority ?? currentTask.priority,
                tagIds: payload.tagIds ?? currentTask.tagIds,
            }

            this.items = this.items.map((task) =>
                task.id === id ? updatedTask : task
            )

            saveTasks(this.items)

            return updatedTask
        },

        async removeTask(id: string): Promise<void> {
            await new Promise((resolve) => setTimeout(resolve, 200))

            this.items = this.items.filter((task) => task.id !== id)
            saveTasks(this.items)
        },

        async changeStatus(id: string, status: TaskStatus): Promise<void> {
            await this.updateTask(id, { status })
        },
    },
})