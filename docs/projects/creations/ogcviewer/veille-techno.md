<script setup>
import TestPrimevue from '/components/TestPrimevue.vue'
</script>

# Veille technologique

## Choix des technologies

Pour ce projet, j'ai choisi d'utiliser les technologies suivantes :
- **Vue.js** car c'est un framework **JavaScript** moderne et performant qui permet de créer des applications web réactives et dynamiques.
De plus, je commence à bien le maîtriser et je l'apprécie beaucoup.
- **OpenLayers** car c'est une bibliothèque **JavaScript** qui permet d'afficher des cartes interactives et de manipuler des données géographiques.
Je commence aussi à bien le maîtriser.
- **PrimeVue** car c'est une bibliothèque de composants **UI** pour **Vue.js** qui permet de créer des interfaces utilisateur modernes et réactives.
Il me facilitera la création de l'interface de l'application cartographique.

### Vue.js

J'ai déjà présenté **Vue.js** dans la partie [veille technologique](/projects/creations/restauration-web/veille-techno#vue-js-pour-le-frontend) du projet de **Restauration Web**.

### OpenLayers (cartographie)

J'ai déjà présenté **OpenLayers** dans la partie [veille technologique](/projects/creations/puzzle54/veille-techno#presentation-d-openlayers) du projet **Puzzle54**.

### PrimeVue (UI)

<img style="margin: 0 auto" width="300px" src="/img/primevue-logo.png?url">

[PrimeVue](https://primevue.org/) est une bibliothèque de composants UI customisables pour **Vue.js** qui permet de créer des interfaces utilisateur modernes et réactives.
Elle propose une large gamme de composants prêts à l'emploi, tels que des boutons, des formulaires, des tableaux, des graphiques, etc.
Elle est très facile à utiliser et à intégrer dans un projet **Vue.js**.
Elle est également très bien documentée et dispose d'une communauté active qui contribue à son développement.

Cette bibliothèque me sera très utile pour créer l'interface de l'application cartographique.

En voici un petit aperçu :

<TestPrimevue />

Et voici le code servant à refaire cet aperçu :

```vue
<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
</script>

<template>
    <div class="container">
        <Card style="width: 25rem; overflow: hidden">
            <template #header>
                <img alt="user header" src="/img/card-vue.jpg?url" />
            </template>
            <template #title>Advanced Card</template>
            <template #subtitle>Card subtitle</template>
            <template #content>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button label="Cancel" severity="secondary" outlined />
                    <Button label="Save" />
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

p {
    margin: 0;
}

.p-card-footer div {
    display: flex;
    gap: 1rem;
    margin-top: 0.25rem;
}

button {
    width: 100%;
}
</style>
```