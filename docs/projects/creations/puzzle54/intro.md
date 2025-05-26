# Puzzle54

<CustomContainer type="info">
<p><a target="_blank" href="https://webcarto.infogeo54.fr/index.php/view/map?repository=public&project=puzzle_cd54">Lien vers le projet</a></p>
</CustomContainer>

## Introduction

J'ai réalisé **seul** ce projet (sauf pour les données de l'**api**), il a été réalisé en **JavaScript** avec la bibliothèque [OpenLayers](/projects/creations/puzzle54/veille-techno#presentation-d-openlayers),
une bibliothèque **JavaScript open source[^1]** qui permet de créer des **cartes interactives** dans un navigateur web.

## Objectif du projet

L'objectif de ce projet est d'être un **puzzle en ligne**, où l'utilisateur doit **reconstituer** une carte du département de Meurthe-et-Moselle en plaçant les **cantons** à leur place sur la carte.
Il informe également l'utilisateur sur les **conseillers** des cantons du département.

Ce projet a pour but d'être une manière **ludique** et **interactive** de découvrir les cantons du département de Meurthe-et-Moselle ainsi que les conseillers qui y sont élus.

## Missions

Mes missions sur ce projet ont été les suivantes :
- [Trouver une bibliothèque ou un plugin pour réaliser le projet](/projects/creations/puzzle54/veille-techno#openlayers)
    - [Exemple de projet similaires existants](/projects/creations/puzzle54/veille-techno#exemples-de-projets-similaires)
    - [Apprendre à utiliser OpenLayers](/projects/creations/puzzle54/veille-techno#apprendre-a-utiliser-openlayers)
- [Réaliser un puzzle en web avec des données GeoJSON](/projects/creations/puzzle54/realisation#realiser-un-puzzle-en-web-avec-des-donnees-geojson)
    - [Afficher les données GeoJSON sur la carte](/projects/creations/puzzle54/realisation#afficher-les-donnees-geojson-sur-la-carte)
    - [Modifier l'apparence des pièces du puzzle](/projects/creations/puzzle54/realisation#modifier-l-apparence-des-pieces-du-puzzle)
    - [Permettre de déplacer les pièces du puzzle](/projects/creations/puzzle54/realisation#permettre-de-deplacer-les-pieces-du-puzzle)
    - [Créer notre puzzle](/projects/creations/puzzle54/realisation#creer-notre-puzzle)

[^1]: La désignation **open source**, s'applique aux logiciels dont la licence respecte des critères précisément établis par l'[Open Source Initiative](https://fr.wikipedia.org/wiki/Open_Source_Initiative),
c'est-à-dire les possibilités de **libre redistribution**, d'**accès au code source** et de **création de travaux dérivés**.