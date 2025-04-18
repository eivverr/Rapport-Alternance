<script setup>
import CustomContainer from '/components/CustomContainer.vue'
</script>

# Atlas départemental de Meurthe-et-Moselle

<custom-container type="info">
<p>
La version présentée ici est la version <strong>Admin</strong> du projet, vous n'aurez donc pas accès à la carte des signalements et vous n'aurez que des images de l'interface pour illustrer les améliorations apportées.
</p>
<p>
Une partie du code du projet se trouve sur <a href="/annexe/codes/atlas">cette page</a>.
</p>
</custom-container>

## Introduction

L'atlas départemental de Meurthe-et-Moselle est un projet de cartographie développé pour le **Conseil Départemental de Meurthe-et-Moselle** sur **Lizmap**.
Il permet de visualiser les différentes couches de données du département, comme l'évolution de la population, le taux de pauvreté, etc.

Mon objectif sur ce projet était d'améliorer l'interface de l'application pour qu'elle soit plus agréable à utiliser et plus facile à comprendre.

## Missions

- [Actualiser le tableau lors d'un click sur un checkbox](#actualisation-du-tableau)
- [Lors d'un click sur un checkbox, décocher les autres checkboxs](#decocher-les-autres-checkbox)

J'ai également amélioré l'affichage de l'interface, mais ce n'est pas assez important pour en faire une présentation.

## Améliorations

### Actualisation du tableau

Normalement dans **Lizmap**, il faut choisir quel tableau de données ouvrir dans une fenêtre dédiée, or ici, 
on doit avoir le tableau déjà ouvert avec les données de la couche sélectionnée.
De plus, il faut que le tableau se mette à jour lors d'un click sur un checkbox.

**Exemple du tableau de Lizmap de base :**

<img style="margin: 0 auto" src="/img/atlas-base-table-exemple.png?url">

### Décocher les autres checkbox

Dans **Lizmap**, on peut cocher plusieurs checkboxs en même temps et donc avoir plusieurs couches affichées sur la carte.
Mais ici, on veut que lorsqu'on clique sur une checkbox, toutes les autres checkboxs soient décochées.

Si je pouvais changer le comportement de **Lizmap**, je ferais en sorte qu'il créé des **radio buttons** au lieu de **checkboxes**,
ce qui permettrait de n'en cocher qu'une seule à la fois, mais ce n'est pas possible.
On doit donc décocher toutes les autres checkboxs des couches de données attributaires.

### Démo

<video controls muted autoplay loop style="margin: 0 auto; max-width: 100%">
    <source src="/video/demo-atlas.mp4" type="video/mp4">
    Your browser does not support the video tag. 
</video>
