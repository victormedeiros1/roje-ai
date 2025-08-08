import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'

import './styles/main.css'

import 'primevue/resources/themes/aura-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue)
app.directive('tooltip', Tooltip)

app.mount('#app')
