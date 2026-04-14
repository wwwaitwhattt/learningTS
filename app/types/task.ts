export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    tagIds: string[]
    createdAt: string
    updatedAt: string
}

export interface CreateTask {
    title: string
    description: string
    priority: TaskPriority
    tagIds: string[]
}

export interface UpdateTask {
    title?: string
    description?: string
    status?: TaskStatus
    priority?: TaskPriority
    tagIds?: string[]
}

export interface TaskFormValues {
    title: string
    description: string
    priority: TaskPriority
    tagIds: string[]
}