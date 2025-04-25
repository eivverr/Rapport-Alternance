<script setup>
import DemoWMS from './components/DemoWMS.vue';
</script>

# Réaliser une application cartographique

## Afficher une carte avec des couches de données WMS

### WMS kézako ?

Bon déjà c'est quoi un **WMS** ? Le **Web Map Service** est un standard de l'**OGC** ([Open Geospatial Consortium](https://fr.wikipedia.org/wiki/Open_Geospatial_Consortium)) 
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

[Code de la démonstration]() et le résultat :

<DemoWMS />

## Demo du 18/04/2025

<video controls muted autoplay loop style="margin: 0 auto; max-width: 100%">
    <source src="/video/demo-atlas-vuejs.mp4" type="video/mp4">
    Your browser does not support the video tag. 
</video>