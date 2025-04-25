<script setup>
import DemoWMS from './components/DemoWMS.vue';
import DemoChartjs from './components/DemoChartjs.vue';
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

Pour afficher une carte avec des couches de données **WMS** dans **OpenLayers**, il faut créer un objet `layer.Tile` avec une source de type `source.TileWMS`.
Cet objet a besoins du nom de la couche à afficher, ainsi que l'URL du serveur **WMS**.
On peut aussi ajouter des paramètres comme le nom du projet et du dépôt (important pour le projet **Opendata**, car il est mis en ligne via **Lizmap**).

Ensuite, il faut ajouter cette couche à la carte.

[Code de la démonstration](/annexe/codes/ogcviewer#afficher-une-carte-avec-des-couches-de-donnees-wms) et le résultat :

<DemoWMS />

## Afficher un graphique sur les couches de données

Pour afficher un graphique sur les couches de données, j'ai utilisé la bibliothèque [Chart.js](https://www.chartjs.org/),
qui est une bibliothèque JavaScript **open source gratuite** pour la visualisation de données.
En plus, **PrimeVue** propose un [composant](https://www.primevue.org/chart/) qui permet d'afficher un graphique facilement avec **Chart.js**.

Voici un exemple de graphique avec **Chart.js** (le code est celui de l'[exemple](https://primevue.org/chart/#pie) de **PrimeVue**) :

<DemoChartjs />

Comme je l'ai dit plus haut, les couches **WMS** ne contiennent que des images et aucune données.
Pour en avoir, il faut donc utiliser le **WFS** pour récupérer les données de la couche au format **JSON**.
J'ai déjà expliqué comment faire dans le projet [Puzzle54](/projects/creations/puzzle54/intro) dans la partie 
[Afficher les données GeoJSON sur la carte](/projects/creations/puzzle54/realisation#afficher-les-donnees-geojson-sur-la-carte).

## Demo du 25/04/2025

<video controls muted autoplay loop style="margin: 0 auto; max-width: 100%">
    <source src="/video/demo-atlas-vuejs.mp4" type="video/mp4">
    Your browser does not support the video tag. 
</video>