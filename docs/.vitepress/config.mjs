import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Rapport d'alternance",
  description: "Mon rapport d'alternance pour ma troisième année de BUT Informatique",
  themeConfig: {
    logo: "/logo.png",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/home' },
      { text: 'Markdown Examples', link: '/markdown-examples' }
    ],

    search: {
      provider: "local"
    },

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Accueil', link: '/home' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
