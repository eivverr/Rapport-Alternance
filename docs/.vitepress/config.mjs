import { defineConfig } from 'vitepress'
import footnotes from 'markdown-it-footnote'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    cleanUrls: true,
    lastUpdated: true,
    head: [
        ['link', { rel: 'icon', href: '/img/logo.png' }]
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

        logo: "/img/logo.png",

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Projets', items: [
                { text: 'Frelon signalement', link: '/frelon' },
                { text: 'Maptour', link: '/maptour' },
                { text: 'Puzzle54', link: '/puzzle54/intro' }
            ] }
        ],

        search: {
            provider: "local"
        },

        sidebar: [
            {
                text: 'Accueil',
                link: '/home'
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
                        collapsed: false,
                        items: [
                            { text: 'Frelon signalement', link: '/frelon' },
                            { text: 'Maptour', link: '/maptour' }
                        ]
                    },
                    {
                        text: 'Créations',
                        collapsed: false,
                        items: [
                            {
                                text: 'Puzzle54',
                                collapsed: true,
                                link: '/puzzle54/intro',
                                items: [
                                    // { text: 'Introduction', link: '/puzzle54/intro' },
                                    { text: 'Veille technologique', link: '/puzzle54/veille-techno' },
                                    { text: 'Réalisation', link: '/puzzle54/realisation' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Annexe',
                items: [
                    { text: 'Liens', link: '/liens' },
                    {
                        text: 'Codes',
                        collapsed: false,
                        items: [
                            { text: 'Puzzle54', link: '/codes/puzzle54' }
                        ]
                    }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/WashiFR/Rapport-Alternance' },
            { icon: 'vitepress', link: 'https://vitepress.dev' }
        ]
    }
})