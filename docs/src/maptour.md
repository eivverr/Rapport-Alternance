# Maptour château de Lunèville

<script setup>
import CustomContainer from '/components/CustomContainer.vue'
</script>

<custom-container type="info">
<p>
<a target="_blank" href="https://webcarto.infogeo54.fr/index.php/view/map?repository=public&project=maptour_chateau_luneville">Lien vers le projet</a> <i>(version publique)</i>.
</p>
</custom-container>

## Introduction

### Missions

Mes missions sur ce projet ont été les suivantes :
- Affichage d'une popup au lancement de la carte pour présenter le projet
    - Contenu de la popup récupéré depuis l'api du projet
- Ajout des niveaux de zoom sur les éléments de la carte
    - Zoom sur les points d'intérêt avec le niveau de zoom
    - Zoom sur le circuit avec le niveau de zoom au lancement de la carte
- Réglage des boutons de navigation (suivant et précédent)
- Amélioration de l'affichage des points d'intérêt

## Améliorations