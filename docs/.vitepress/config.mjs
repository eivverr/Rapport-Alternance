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
            { text: 'Site du service', link: 'https://infogeo54.fr/' },
            { text: 'Projets du service', link: 'https://webcarto.infogeo54.fr/' },
            { text: 'Projets',
                items: [
                    {
                        text: 'Améliorations',
                        items: [
                            { text: 'Frelon signalement', link: '/projects/upgrades/frelon' },
                            { text: 'Maptour', link: '/projects/upgrades/maptour' },
                            { text: 'Atlas', link: '/projects/upgrades/atlas' }
                        ]
                    },
                    {
                        text: 'Créations',
                        items: [
                            { text: 'Puzzle54', link: '/projects/creations/puzzle54/intro' },
                            { text: 'Script restauration', link: '/projects/creations/script-restauration' },
                            { text: 'Restauration web', link: '/projects/creations/restauration-web/intro' }
                        ]
                    }
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
                    { text: 'Présentation du service', link: '/intro/presentation' },
                    { text: 'Lizmap', link: '/intro/lizmap' }
                ]
            },
            {
                text: 'Projets',
                items: [
                    {
                        text: 'Améliorations',
                        collapsed: false,
                        items: [
                            { text: 'Frelon signalement', link: '/projects/upgrades/frelon' },
                            { text: 'Maptour', link: '/projects/upgrades/maptour' },
                            { text: 'Atlas', link: '/projects/upgrades/atlas' }
                        ]
                    },
                    {
                        text: 'Créations',
                        collapsed: false,
                        items: [
                            {
                                text: 'Puzzle54',
                                collapsed: true,
                                link: '/projects/creations/puzzle54/intro',
                                items: [
                                    { text: 'Veille technologique', link: '/projects/creations/puzzle54/veille-techno' },
                                    { text: 'Réalisation', link: '/projects/creations/puzzle54/realisation' }
                                ]
                            },
                            { text: 'Script restauration', link: '/projects/creations/script-restauration' },
                            {
                                text: 'Restauration web',
                                collapsed: true,
                                link: '/projects/creations/restauration-web/intro',
                                items: [
                                    { text: 'Veille technologique', link: '/projects/creations/restauration-web/veille-techno' },
                                    { text: 'Réalisation', link: '/projects/creations/restauration-web/realisation' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                text: 'Annexe',
                items: [
                    { text: 'Liens', link: '/annexe/liens' },
                    {
                        text: 'Codes',
                        collapsed: false,
                        items: [
                            { text: 'Atlas', link: '/annexe/codes/atlas' },
                            { text: 'Puzzle54', link: '/annexe/codes/puzzle54' },
                            { text: 'Script restauration', link: '/annexe/codes/script-restauration' }
                        ]
                    }
                ]
            }
        ],

        socialLinks: [
            { icon: 'github', link: 'https://github.com/WashiFR/Rapport-Alternance' },
            { icon: 'vitepress', link: 'https://vitepress.dev' }
        ],

        footer: {
            message: "WEIER Loris - Rapport d'alternance - 2025"
        }
    }
})