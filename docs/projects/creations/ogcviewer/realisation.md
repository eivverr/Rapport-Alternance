<script setup>
import DemoWMS from './components/DemoWMS.vue';
import DemoECharts from './components/DemoECharts.vue';
</script>

# Réaliser une application cartographique

## Afficher une carte avec des couches de données WMS

### WMS kézako ?

Bon déjà, c'est quoi un **WMS** ? Le **Web Map Service** est un standard de l'**OGC** ([Open Geospatial Consortium](https://fr.wikipedia.org/wiki/Open_Geospatial_Consortium)) 
qui permet de servir des cartes géographiques sur le web.
Il permet de récupérer des **images** de cartes à partir de données géographiques stockées sur un serveur.

Il ne faut pas le confondre avec le **WFS** ([Web Feature Service](https://fr.wikipedia.org/wiki/Web_Feature_Service)) 
qui permet de récupérer des **données géographiques** au format vectoriel.
C'est d'ailleurs ce dernier qui est utilisé par le projet [Puzzle54](/projects/creations/puzzle54/intro) pour afficher les données géographiques sur la carte.

À savoir aussi que le **WMS** est uniquement au format **XML**, tandis que le **WFS** peut être en **XML**, **JSON** ou **GeoJSON**.

Voici des liens vers les **WMS** et **WFS** de la carte [Webcarto Opendata](https://webcarto.infogeo54.fr/index.php/view/map?repository=opendata&project=opendata) 
pour voir la différence entre les deux :
- [WMS](https://webcarto.infogeo54.fr/index.php/lizmap/service?repository=opendata&project=opendata&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities)
- [WFS (XML)](https://webcarto.infogeo54.fr/index.php/lizmap/service?repository=opendata&project=opendata&SERVICE=WFS&VERSION=1.3.0&REQUEST=GetFeature&typename=Colleges)
- [WFS (JSON)](https://webcarto.infogeo54.fr/index.php/lizmap/service?repository=opendata&project=opendata&SERVICE=WFS&VERSION=1.3.0&REQUEST=GetFeature&typename=Colleges&outputFormat=application/json)

### WMS et OpenLayers

Pour afficher une carte avec des couches de données **WMS** dans **OpenLayers**, il faut créer un objet `layer.Tile` avec une source de type `source.TileWMS`,
ou alors un objet `layer.Image` avec une source de type `source.ImageWMS`.
Cela dépend de si on veut afficher une couche de tuiles ou une couche d'image.
Cet objet a besoins du nom de la couche à afficher, ainsi que l'URL du serveur **WMS**.
On peut aussi ajouter des paramètres comme le nom du projet et du dépôt (important pour le projet **Opendata**, car il est mis en ligne via **Lizmap**).

Ensuite, il faut ajouter cette couche à la carte.

[Code de la démonstration](/annexe/codes/ogcviewer#afficher-une-carte-avec-des-couches-de-donnees-wms) et le résultat :

<DemoWMS />

### Récupérer toutes les couches WMS disponibles

On a vu comment afficher une couche **WMS**, mais comment savoir quelles couches sont disponibles sur le serveur ?
Pour ça, il faut faire une requête **fetch** sur l'URL du serveur **WMS** avec le paramètre `REQUEST=GetCapabilities`.
Cela va renvoyer un fichier **XML** avec toutes les couches disponibles sur le serveur.
Il faut ensuite parser ce fichier **XML** pour récupérer les noms des couches et les afficher dans une liste.

Voici un exemple de code pour récupérer les couches **WMS** disponibles sur le serveur **Opendata** :

```typescript
async function fetchCapabilities(): Promise<object> {
    const response = await fetch(
        `https://webcarto.infogeo54.fr/index.php/lizmap/service?repository=opendata&project=opendata&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetCapabilities`,
    )
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const text = await response.text()
    const parser = new WMSCapabilities() // Méthode de la bibliothèque OpenLayers qui permet de parser le fichier XML
    return parser.read(text)
}
```

Cela renvoie un objet avec toutes les couches disponibles et leurs informations (nom, description, etc.).

## Afficher un graphique sur les couches de données

Pour afficher un graphique sur les couches de données, j'ai utilisé la bibliothèque [ECharts](https://echarts.apache.org/en/index.html)
qui est une bibliothèque JavaScript **open source gratuite** pour la visualisation de données.
Elle est **beaucoup plus puissante** que [Chart.js](https://www.chartjs.org/) et permet de créer des graphiques interactifs et dynamiques.

Voici un exemple de graphique avec **ECharts** ([code](https://echarts.apache.org/examples/en/editor.html?c=pie-simple)) :

<DemoECharts />

Comme je l'ai dit plus haut, les couches **WMS** ne contiennent que des images et aucune données.
Pour en avoir, il faut donc utiliser le **WFS** pour récupérer les données de la couche au format **JSON** ou **GeoJSON**.
J'ai déjà expliqué comment faire dans le projet [Puzzle54](/projects/creations/puzzle54/intro) dans la partie 
[Afficher les données GeoJSON sur la carte](/projects/creations/puzzle54/realisation#afficher-les-donnees-geojson-sur-la-carte).

Ici, on refait la même chose, mais on cache la couche **WFS**, on affiche déjà l'image de la couche **WMS**,
le **WFS** ne sert qu'à récupérer les données pour afficher le graphique avec les données.

Une fois que la couche **WFS** a été chargée, on peut récupérer les données et les afficher dans le graphique.

## Permettre de modifier/ajouter des graphiques

Pour permettre de modifier/ajouter des graphiques, il nous faut un backend pour stocker les données des graphiques.
J'ai donc créé un backend avec **Express** et une base de données **SQLite** pour stocker les données des graphiques.

Voici à quoi ressemble la base de données **SQLite** :

<iframe width="100%" height="500px" style="box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); border-radius:15px;" allowtransparency="true" allowfullscreen="true" scrolling="no" title="Embedded DrawSQL IFrame" frameborder="0" src="https://drawsql.app/teams/test-4619/diagrams/ogcviewer-sqlite/embed"></iframe>

### Faire un backend avec Express

Pour faire un backend avec **Express**, on utilise la méthode **MVC** (Modèle-Vue-Contrôleur) qui permet de séparer la logique de l'application en trois parties :
- **Modèle** : la partie qui gère les données et la logique de l'application (par exemple, la connexion à la base de données, les requêtes SQL, etc.).
- **Vue** : la partie qui gère l'affichage des données (par exemple, les routes, les vues, etc.).
- **Contrôleur** : la partie qui gère les interactions entre le modèle et la vue (par exemple, les requêtes HTTP, les réponses, etc.).

Voici un [exemple de code](/annexe/codes/ogcviewer#faire-un-backend-avec-express) pour créer un backend avec **Express**.

Maintenant, on peut faire des requêtes HTTP via le frontend pour récupérer les données des graphiques.
On peut aussi ajouter des routes pour ajouter, modifier ou supprimer des graphiques.

## Imprimer la carte

Une des fonctionnalités demandées et importantes pour l'application est de pouvoir imprimer la carte.
Et oui, car certaines personnes préfèrent encore avoir une version papier de la carte plutôt que de l'afficher sur un écran.

Pour cela, j'ai essayé plusieurs bibliothèques comme **html2pdf**, **html-to-img**, **html-to-svg**, **jsPdf** avec **html2canvas**, 
mais aussi **puppeteer** ou **playwright** pour générer un PDF en backend.
Mais aucune de ces bibliothèques ne permettait d'imprimer la carte correctement et de manière satisfaisante.

On s'est donc contenté de faire une impression basique de la carte avec le la méthode `window.print()` directement dans le navigateur.
Cela donne un rendu correct, mais pas parfait (notamment sur Chrome, mais aussi, car les textes dans la carte restent flou).
Avec cette méthode, on peut choisir le style d'impression grâce à la règle CSS `@media print` et ainsi masquer les éléments qui ne sont pas nécessaires à l'impression.

Le seul problème avec cette méthode, c'est que si l'élément imprimer est trop grand, il sera découpé en plusieurs pages.
Pour cela, je force l'impression en A3 avec la règle CSS `@page { size: A3 landscape; }`.
Puis dans une modal/popup, je fais un container avec la taille de la page A3, et j'affiche la carte à l'intérieur.

Sauf que certains écrans sont plus petits que la taille de la page A3, donc on utilise la règle CSS `transform: scale(valeur_scale);`
pour réduire la taille de la carte et l'adapter à l'écran.
Cela permet à l'utilisateur de voir à quoi ressemblera la carte imprimée avant de lancer l'impression.

[Code de la démonstration](/annexe/codes/ogcviewer#imprimer-la-carte) et le résultat :
<img style="margin: 0 auto" src="/img/ogcviewer-pdf-map.png?url">

## Demo du 07/07/2025 (version 1.0.0)

<video controls muted autoplay loop style="margin: 0 auto; max-width: 100%">
    <source src="/video/demo-ogcviewer.mp4" type="video/mp4">
    Your browser does not support the video tag. 
</video>