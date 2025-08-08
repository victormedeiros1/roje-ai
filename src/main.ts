import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import App from './App.vue'

import './styles/main.css'

import 'primevue/resources/themes/aura-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue)

app.mount('#app')
