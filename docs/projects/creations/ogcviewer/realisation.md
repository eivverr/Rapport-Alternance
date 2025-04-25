# Réaliser une application cartographique

## Afficher une carte avec des couches de données WMS

### WMS kézako ?

Bon déjà c'est quoi un **WMS** ? Le **Web Map Service** est un standard de l'**OGC** ([Open Geospatial Consortium](https://fr.wikipedia.org/wiki/Open_Geospatial_Consortium)) 
qui permet de servir des cartes géographiques sur le web.
Il permet de récupérer des **images** de cartes à partir de données géographiques stockées sur un serveur.

Il ne faut pas le confondre avec le **WFS** ([Web Feature Service](https://fr.wikipedia.org/wiki/Web_Feature_Service)) 
qui permet de récupérer des **données géographiques** au format vectoriel.
C'est d'ailleurs ce dernier qui est utilisé par le projet [Puzzle54](/projects/creations/puzzle54/intro) pour afficher les données géographiques sur la carte.

### WMS et OpenLayers

Pour afficher une carte avec des couches de données **WMS** dans **OpenLayers**, il faut créer un objet `layer.Tile` avec une source de type `source.TileWMS`.

### Démonstration

## Demo du 18/04/2025

<video controls muted autoplay loop style="margin: 0 auto; max-width: 100%">
    <source src="/video/demo-atlas-vuejs.mp4" type="video/mp4">
    Your browser does not support the video tag. 
</video>