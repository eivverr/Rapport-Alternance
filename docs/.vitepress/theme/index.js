// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import './style.css'
import './custom.css'

// PrimeVue
import 'primeicons/primeicons.css'
import Button from 'primevue/button'
import Card from 'primevue/card'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: false
        },
      },
    })
    app.component('Button', Button)
    app.component('Card', Card)
    // ...
  }
}
