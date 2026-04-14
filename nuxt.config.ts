export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        target: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable']
      }
    },
    sharedTsConfig: {
      compilerOptions: {
        target: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable']
      }
    },
    nodeTsConfig: {
      compilerOptions: {
        target: 'ES2020',
        lib: ['ES2020']
      }
    }
  },
  nitro: {
    typescript: {
      tsConfig: {
        compilerOptions: {
          target: 'ES2020',
          lib: ['ES2020']
        }
      }
    }
  },
  modules: ['@pinia/nuxt'],
})