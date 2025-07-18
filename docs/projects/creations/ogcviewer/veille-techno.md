---
prev: "OGCViewer | Introduction"
next: "OGCViewer | Réalisation"
---

<script setup>
import ExamplePrimevue from './components/ExamplePrimevue.vue'
</script>

# Veille technologique

## Choix des technologies

Pour ce projet, j'ai choisi d'utiliser les technologies suivantes :
- **Vue.js** car c'est un framework **JavaScript** moderne et performant qui permet de créer des applications web réactives et dynamiques.
De plus, je commence à bien le maîtriser et je l'apprécie beaucoup.
- **Typescript** car c'est un sur-ensemble de **JavaScript** qui permet d'ajouter des types statiques au langage.
- **OpenLayers** car c'est une bibliothèque **JavaScript** qui permet d'afficher des cartes interactives et de manipuler des données géographiques.
Je commence aussi à bien le maîtriser.
- **PrimeVue** car c'est une bibliothèque de composants **UI**[^1] pour **Vue.js** qui permet de créer des interfaces utilisateur modernes et réactives.
Il me facilitera la création de l'interface de l'application cartographique.
- **Tailwind CSS** car c'est un framework **CSS** qui permet de personnaliser facilement les styles de l'application.
Et aussi car **PrimeVue** l'utilise pour ses composants (pas obligatoire mais c'est un plus).
- **Express** car c'est un framework **Node.js** qui permet de créer un backend facilement et rapidement.
Cela permet aussi d'avoir une uniformité dans les technologies utilisées.

### Vue.js

<img style="margin: 0 auto" width="300px" src="/img/Vue_logo.png?url">

[Vue.js](https://v3.vuejs.org/) est un framework[^2] **JavaScript** open-source pour construire des interfaces utilisateur et des applications **monopages**.
Créé par **Evan You**, il est maintenu par lui et le reste des membres actifs de l'équipe principale travaillant sur le projet et son écosystème.

Il est conçu pour être adaptable et peut être intégré dans des projets existants sans problème.
Il utilise une approche réactive pour la gestion de l'état et permet de créer des composants réutilisables.

Dans **Vue.js**, les composants sont des blocs de construction de l'interface utilisateur.
Ils sont définis par des fichiers `.vue` qui contiennent le code HTML, CSS et JavaScript du composant.

Voici un exemple de composant simple :
```vue
<template>
    <div class="hello">
        <h1>{{ message }}</h1>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const message = ref('Hello, Vue.js!')
</script>

<style scoped>
.hello {
    color: blue;
}
</style>
```

### Typescript

<img style="margin: 0 auto" width="100px" src="/img/Typescript_logo.svg?url">

[Typescript](https://www.typescriptlang.org/) est un sur-ensemble de **JavaScript** qui permet d'ajouter des types statiques au langage.
Il est développé par **Microsoft** et est devenu très populaire ces dernières années.
Il est utilisé par de nombreux frameworks et bibliothèques, comme **Vue.js**, **React**, **Angular**, etc.
Il permet de détecter les erreurs de type à la compilation, ce qui permet d'éviter de nombreuses erreurs à l'exécution.

En voici un exemple :
```typescript
function add(a: number, b: number): number {
    return a + b
}
const result = add(1, 2) // result est de type number
```

Il permet aussi de créer des types personnalisés, ce qui permet de mieux structurer le code et de le rendre plus lisible.

```typescript
type User = {
    name: string
    age: number
}
function greet(user: User): string {
    return `Hello, ${user.name}!`
}
const user: User = { name: 'John', age: 30 }
console.log(greet(user)) // Hello, John!
```

Ne l'ayant jamais utilisé dans mes autres projets **Vue.js**, je me suis dit que c'était l'occasion de l'apprendre.

### OpenLayers (cartographie)

J'ai déjà présenté **OpenLayers** dans la partie [veille technologique](/projects/creations/puzzle54/veille-techno#presentation-d-openlayers) 
du projet [Puzzle54](/projects/creations/puzzle54/intro).

### PrimeVue (UI)

<img style="margin: 0 auto" width="300px" src="/img/primevue-logo.png?url">

[PrimeVue](https://primevue.org/) est une bibliothèque de composants UI customisables pour **Vue.js** qui permet de créer des interfaces utilisateur modernes et réactives.
Elle propose une large gamme de composants prêts à l'emploi, tels que des boutons, des formulaires, des tableaux, des graphiques, etc.
Elle est très facile à utiliser et à intégrer dans un projet **Vue.js**.
Elle est également très bien documentée et dispose d'une communauté active qui contribue à son développement.

Cette bibliothèque me sera très utile pour créer une interface moderne de manière rapide et efficace.

En voici un petit aperçu avec le composant [Card](https://primevue.org/card/#advanced) :

<ExamplePrimevue />

### Tailwind CSS

<img style="margin: 32px auto" width="300px" src="/img/Tailwind_CSS_logo.svg?url">

[Tailwind CSS](https://tailwindcss.com/) est un framework CSS qui permet de créer des interfaces utilisateur modernes et réactives.
Il est basé sur le principe de la **programmation utilitaire** (utility-first), qui consiste à utiliser des classes CSS prédéfinies pour créer des styles.
Il permet de créer des interfaces utilisateur rapidement et facilement, sans avoir à écrire de CSS personnalisé.

Par exemple, pour créer un bouton avec un fond bleu et un texte blanc, il suffit d'utiliser les classes `bg-blue-500` et `text-white` :
```html
<button class="bg-blue-500 text-white">Mon bouton</button>
```
Cela évite d'avoir à écrire des classes CSS personnalisées pour des styles simples.

En revanche, pour les styles complexes, il est préférable d'utiliser du CSS personnalisé, pour éviter d'avoir trop de classes CSS dans le code HTML, du genre :
```html
<button class="bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
    Mon bouton 
</button>
```

### Express

[Express](https://expressjs.com/) est un framework [Node.js](https://nodejs.org/) qui permet de créer des applications web et des API facilement et rapidement.
Il permet de créer des routes, de gérer les requêtes et les réponses, de gérer les sessions, etc.

[^1]: **UI** = User Interface *(Interface Utilisateur pour les non anglophones)*

[^2]: Le terme **framework** désigne un ensemble d'outils et de bibliothèques qui facilitent le développement d'applications en fournissant une structure de base et des fonctionnalités prêtes à l'emploi.