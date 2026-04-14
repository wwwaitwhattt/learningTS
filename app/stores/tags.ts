import { defineStore } from 'pinia'
import type { Tag } from '~/types/tag'

interface TagsState {
    items: Tag[]
}

const STORAGE_KEY = 'tags'

const defaultTags: Tag[] = [
    { id: '1', label: 'Работа', color: '#ff7675' },
    { id: '2', label: 'Дом', color: '#74b9ff' },
    { id: '3', label: 'Учеба', color: '#55efc4' },
]

function loadTags(): Tag[] {
    if (import.meta.server) {
        return []
    }

    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTags))
        return defaultTags
    }

    return JSON.parse(raw) as Tag[]
}

function saveTags(tags: Tag[]): void {
    if (import.meta.server) {
        return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tags))
}

export const useTagsStore = defineStore('tags', {
    state: (): TagsState => ({
        items: [],
    }),

    getters: {
        getTagById: (state) => {
            return (id: string): Tag | undefined => {
                return state.items.find((tag) => tag.id === id)
            }
        },
    },

    actions: {
        initTags(): void {
            this.items = loadTags()
        },

        async fetchTags(): Promise<void> {
            await new Promise((resolve) => setTimeout(resolve, 200))
            this.items = loadTags()
        },

        async createTag(tag: Omit<Tag, 'id'>): Promise<Tag> {
            await new Promise((resolve) => setTimeout(resolve, 200))

            const newTag: Tag = {
                ...tag,
                id: Date.now().toString(),
            }

            this.items.push(newTag)
            saveTags(this.items)

            return newTag
        },
    },
})