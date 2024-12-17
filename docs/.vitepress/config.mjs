import { defineConfig } from 'vitepress'
import footnotes from 'markdown-it-footnote'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    srcDir: './src',
    cleanUrls: true,
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    title: "Rapport d'alternance",
    description: "Mon rapport d'alternance pour ma troisième année de BUT Informatique",
    markdown: {
        config: (md) => {
            md.use(footnotes)
        }
    },
    themeConfig: {

        outline: 'deep',

        logo: "/logo.png",

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Accueil', link: '/home' },
            { text: 'Introduction', link: '/presentation' },
            { text: 'Projets', link: '/frelon' }
        ],

        search: {
            provider: "local"
        },

        sidebar: [
            {
                items: [
                    { text: 'Accueil', link: '/home' },
                ]
            },
            {
                text: 'Introduction',
                items: [
                    { text: 'Présentation du service', link: '/presentation' },
                    { text: 'Lizmap', link: '/lizmap' }
                ]
            },
            {
                text: 'Projets',
                items: [
                    {
                        text: 'Améliorations',
                        items: [
                            { text: 'Frelon signalement', link: '/frelon' },
                            { text: 'Maptour', link: '/maptour' }
                        ]
                    },
                    {
                        text: 'Créations',
                        items: [
                            { text: 'Puzzle54', link: '/puzzle54' }
                        ]
                    }
                ]
            },
            {
                items: [
                    { text: 'Conclusion', link: '/conclusion' },
                    { text: 'Annexe', link: '/annexe' }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/WashiFR/Rapport-Alternance' },
            { icon: 'vitepress', link: 'https://vitepress.dev' }
        ]
    }
})