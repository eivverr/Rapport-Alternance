# Puzzle54

<script setup>
import CustomContainer from '/components/CustomContainer.vue'
</script>

<custom-container type="info">
<p><a target="_blank" href="https://webcarto.infogeo54.fr/index.php/view/map?repository=public&project=puzzle_cd54">Lien vers le projet</a></p>
</custom-container>

## Introduction

### Objectif du projet

L'objectif de ce projet est d'être un **puzzle en ligne**, où l'utilisateur doit **reconstituer** une carte du département de Meurthe-et-Moselle en plaçant les **cantons** à leur place sur la carte.

### Missions

Mes missions sur ce projet ont été les suivantes :
- Trouver une bibliothèque ou un plugin pour réaliser le projet
    - Exemple de projet similaires existants
    - OpenLayers
    - Apprendre à utiliser OpenLayers
- Réaliser un puzzle en web avec des données GeoJSON
    - Afficher les données GeoJSON sur la carte
    - Modifier l'apparence des pièces du puzzle
    - Permettre de déplacer les pièces du puzzle
    - Vérifier si les pièces sont bien placées
    - Vérifier si le puzzle est terminé
- Ajouter des fonctionnalités supplémentaires
    - Ajout d'un bouton pour zoomer sur le puzzle
    - Ajout d'un bouton pour zoomer sur la prochaine pièce à placer
    - Mélanger les pièces du puzzle
    - Afficher un tootltip quand une pièce est bien placée
    - Ajout d'une balise info qui affiche des infos au clic
    - Réafficher le tooltip sur le clic d'une pièce déjà placée
    - Système d'aimant pour placer les pièces plus facilement