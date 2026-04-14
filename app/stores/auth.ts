import { defineStore } from 'pinia'
import type { User } from '~/types/auth'

interface AuthState {
    user: User | null
    isLoading: boolean
    error: string | null
}

const TEST_USER: User = {
    id: '1',
    name: 'Test User',
    email: 'test@test.com',
    role: 'user',
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isLoading: false,
        error: null,
    }),

    getters: {
        isAuthenticated: (state): boolean => !!state.user,
        isAdmin: (state): boolean => state.user?.role === 'admin',
    },

    actions: {
        initAuth(): void {
            const authUser = useCookie<User | null>('auth_user', {
                default: () => null,
            })

            this.user = authUser.value
        },

        async login(email: string, password: string): Promise<void> {
            this.isLoading = true
            this.error = null

            await new Promise((resolve) => setTimeout(resolve, 300))

            if (email === 'test@test.com' && password === '123456') {
                const authUser = useCookie<User | null>('auth_user', {
                    default: () => null,
                })

                authUser.value = TEST_USER
                this.user = TEST_USER
            } else {
                this.error = 'Неверный email или пароль'
            }

            this.isLoading = false
        },

        logout(): void {
            const authUser = useCookie<User | null>('auth_user', {
                default: () => null,
            })

            authUser.value = null
            this.user = null
        },
    },
})