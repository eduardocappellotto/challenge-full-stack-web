import { registerPlugins } from '@/plugins'

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App)

registerPlugins(app)

const pinia = createPinia()
app.use(pinia)

app.mount('#app')
