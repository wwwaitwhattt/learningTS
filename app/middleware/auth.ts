export default defineNuxtRouteMiddleware((to) => {
    const authUser = useCookie('auth_user')

    if (to.path !== '/login' && !authUser.value) {
        return navigateTo('/login')
    }

    if (to.path === '/login' && authUser.value) {
        return navigateTo('/tasks')
    }
})