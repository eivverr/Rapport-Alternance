// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import 'ol/ol.css'
import './styles/style.css'
import './styles/custom.css'

// Components
import CustomContainer from "./components/CustomContainer.vue";
import ComponentExample from "./components/ComponentExample.vue";
import OpenlayersMap from "./components/OpenlayersMap.vue";

// PrimeVue
import 'primeicons/primeicons.css'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

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
    app.component('CustomContainer', CustomContainer)
    app.component('ComponentExample', ComponentExample)
    app.component('OpenlayersMap', OpenlayersMap)
    app.component('Button', Button)
    app.component('Card', Card)
    app.component('Chart', Chart)
    app.component('DataTable', DataTable)
    app.component('Column', Column)
    // ...
  }
}
