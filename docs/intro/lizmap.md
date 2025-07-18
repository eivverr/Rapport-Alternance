---
prev: "Introduction | Présentation de l'entreprise"
next: "Projets améliorés | Frelon signalement 54"
---

# Présentation de Lizmap

[Lizmap](https://www.lizmap.com/) est un logiciel open-source, développé par la société française [3Liz](https://www.3liz.com/) qui est spécialisée dans les solutions SIG. 
Ce plugin [QGIS](https://www.qgis.org/) permet de publier des cartes interactives sur le web, en utilisant les données de **QGI**S.

<img style="margin: 0 auto" src="/img/logo-lizmap.png?url" width="200">

## Avantages

- Les cartes reproduisent **fidèlement** le rendu cartographique réalisé dans QGIS.
- L'éditeur des applications cartographiques utilise **un seul logiciel** : QGIS.
- l'interface Web **s'adapte** aux différentes tailles d'écran
*(ce dernier point n'est pas très juste, certains éléments ne sont pas bien adapté en format mobile, notamment les formulaires)*.
- Une fonction d'**impression intégrée**.
- Un système de **cache** permettant la publication de service WMTS
- Un système de **gestion de droit** permettant le contrôle d'accès aux applications, mais aussi aux outils
- Un système de **filtrage dynamique** des données pour un affichage spécifique

**Lizmap** propose également un moyen de modifier l'interface des applications Web qu'il génère, que ce soit avec du **Javascript** ou du **CSS**, mais cela reste assez limité.

## Inconvénients

À l'heure actuelle, l'entreprise **3Liz** ne propose aucune **documentation** sur le code et les fonctionnalités disponibles ou **API** sur les fonctions qu'utilise **Lizmap**.
Il est donc très compliqué de véritablement customiser une application **Lizmap**.

C'est pour cela notamment que j'ai réalisé le projet [Puzzle54](/projects/creations/puzzle54/intro) avec **OpenLayers**
(qui est d'ailleurs utilisé par **Lizmap** pour afficher les cartes) et non **Lizmap** directement.