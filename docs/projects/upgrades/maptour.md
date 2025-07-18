---
prev: "Projets améliorés | Frelon signalement"
next: "Projets améliorés | Atlas départemental"
---

# Maptour château de Lunèville

<CustomContainer type="warning">
<p>
Pour une raison encore inconnue, le projet ne fonctionne plus correctement. Le projet ne zoom plus sur les points d'intérêt.
</p>
</CustomContainer>

<CustomContainer type="info">
<p>
<a target="_blank" href="https://webcarto.infogeo54.fr/index.php/view/map?repository=public&project=maptour_chateau_luneville">Lien vers le projet</a> <i>(version publique)</i>.
</p>
</CustomContainer>

## Introduction

Le projet **Maptour château de Lunéville** est un projet proposant un circuit touristique permettant de découvrir le château de Lunéville et d'autres points d'intérêt autour du château.
Ce projet a été développé pour le **Conseil Départemental de Meurthe-et-Moselle** sur **Lizmap**.
Le projet a été réaliser par le précédent alternant, et j'ai repris le projet pour y apporter des améliorations visuelles.

La version **Admin** du projet permet d'ajouter, modifier ou de supprimer des points d'intérêt et un circuit touristique sur une carte.
Tandis que la version **Public** permet de consulter les points d'intérêt et le circuit touristique sur une carte.

## Missions

Mes missions sur ce projet ont été les suivantes :
- [Affichage d'une popup au lancement de la carte pour présenter le projet](#affichage-d-une-popup-au-lancement-de-la-carte-pour-presenter-le-projet)
    - [Contenu de la popup récupéré depuis l'api du projet](#contenu-de-la-popup-recupere-depuis-l-api-du-projet)
- [Ajout des niveaux de zoom sur les éléments de la carte](#ajout-des-niveaux-de-zoom-sur-les-elements-de-la-carte)
    - [Zoom sur les points d'intérêt avec le niveau de zoom](#zoom-sur-les-points-d-interet-avec-le-niveau-de-zoom)
    - [Zoom sur le circuit avec le niveau de zoom au lancement de la carte](#zoom-sur-le-circuit-avec-le-niveau-de-zoom-au-lancement-de-la-carte)
- [Réglage du système de navigation](#reglage-du-systeme-de-navigation)
- [Amélioration de l'affichage des informations des points d'intérêt](#amelioration-de-l-affichage-des-informations-des-points-d-interet)

## Améliorations

### Affichage d'une popup au lancement de la carte pour présenter le projet

Pour afficher une popup au lancement de la carte, j'ai utilisé le composant [Modal](https://getbootstrap.com/docs/5.3/components/modal/) de **Bootstrap** 
(comme **Lizmap** intègre **Bootstrap** pour son interface), qui permet d'afficher une popup avec un titre, un contenu et des boutons pour fermer la popup.

Puis, comme sur le projet **Frelon signalement 54**, j'ai permis aux utilisateurs de ne plus afficher la popup au lancement de la carte en cochant la case "**Ne plus afficher au lancement**".

<img style="margin: 0 auto" src="/img/maptour_capture_popup.PNG?url">

#### Contenu de la popup récupéré depuis l'api du projet

À la demande de mon maître d'apprentissage, j'ai récupéré le contenu de la popup depuis l'**api du projet**, pour que le contenu de la popup puisse être modifié sans avoir à modifier le code de la popup.

```javascript
// Nom du répertoire
let repositoryName = lizUrls.params.repository;
// Nom du projet
let projectName = lizUrls.params.project;

/**
 * Récupère les données du circuit
 * @returns {Promise<any>} - Les données du circuit
 */
async function getCircuitData() {
    const url = `https://webcarto.infogeo54.fr/index.php/lizmap/service?repository=${repositoryName}&project=${projectName}&SERVICE=WFS&VERSION=1.3.0&REQUEST=GetFeature&typename=maptour_circuit&outputFormat=GEOJSON`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
```

Ensuite, dans le body de ma **Modal**, j'ajoute le contenu de la popup de l'api du projet.

```javascript
<div class="modal-body">
    <img alt="" src="https://webcarto.infogeo54.fr/index.php/view/media/getMedia?repository=${repositoryName}&project=${projectName}&path=${img}" />
    <p>${texte}</p>
</div>
```

### Ajout des niveaux de zoom sur les éléments de la carte

Mon maître d'apprentissage m'a demandé d'ajouter un système permettant, lorsque l'on passe au point d'intérêt suivant (ou précédent), 
de **zoomer** sur le point d'intérêt avec le niveau de **zoom souhaité**, permettant de bien voir le point d'intérêt sur la carte.
Il m'a également demandé de **zoomer** sur le circuit avec le niveau de **zoom souhaité** au lancement de la carte.

#### Zoom sur les points d'intérêt avec le niveau de zoom

Sur **Lizmap**, avec **QGIS**, on peut définir les niveaux de zoom disponible sur la carte, malheureusement **Lizmap** n'a pas de documentation sur l'utilisation de son code source,
et je n'ai pas trouvé comment récupérer les niveaux de zoom définis sur la carte, j'ai donc défini les niveaux de zoom en dur dans le code 
(sauf pour les niveaux de zoom qui ne sont jamais utilisés, je ne les ai pas définis, d'où le fait que `value` commence à 8), je sais que ce n'est pas optimal,
mais je n'ai pas trouvé d'autre solution.

```javascript
// Niveau des zooms disponibles sur la carte
const zoomLevels = {
    level5000:
        {
            zoom: 5000,
            value: 8
        },
    level2500:
        {
            zoom: 2500,
            value: 9
        },
    ...
};
```

De plus, avec **Lizmap**, il ne suffit pas juste de mettre le niveau de zoom que l'on souhaite (ce qui serait trop simple),
mais il faut donc mettre l'**index** du niveau de zoom dans la liste des niveaux de zoom de la carte.

Un exemple vous aidera à mieux comprendre ce que je veux dire :

```javascript
// Ne fonctionne pas
lizMap.map.zoomTo(5000); 

// Zoom sur le niveau 8 de la carte (ici le niveau 5000 comme défini dans zoomLevels)
lizMap.map.zoomTo(8);
```

Il me fallait donc une fonction qui permet, en fonction du niveau de zoom du point d'intérêt récupéré dans l'api du projet, 
de trouver l'**index** du niveau de zoom dans la liste des niveaux de zoom de la carte.
Ensuite, il ne reste plus qu'à appeler cette fonction lors d'un clic sur le bouton suivant ou précédent.

```javascript
/**
 * Trouve la valeur du zoom correspondant
 * @param zoom - Zoom
 * @returns {*} - Valeur du zoom
 */
function findZoomValue(zoom) {
  let zoomValue = 0;

  for (let level in zoomLevels) {
    if (zoomLevels[level].zoom === zoom) {
      zoomValue = zoomLevels[level].value;
    }
  }

  // Si aucune correspondance trouvée, on met la valeur par défaut à 10
  if (zoomValue === 0) {
    zoomValue = zoomLevels.level2000.value;
  }

  return zoomValue;
}

/**
 * Zoom sur l'élément
 * @param lizMap - LizMap
 * @param zoom - Zoom
 */
window.updateZoomLevel = function(lizMap, zoom) {
  let zoomValue = findZoomValue(zoom);
  lizMap.map.zoomTo(zoomValue);
}
```

#### Zoom sur le circuit avec le niveau de zoom au lancement de la carte

Pour zoomer sur le circuit avec le niveau de zoom souhaité au lancement de la carte, j'ai utilisé la même fonction que pour les points d'intérêt,
mais j'ai simplement appelé cette fonction au lancement de la carte.

#### Démonstration

<video controls muted autoplay loop style="margin: 0 auto; max-width: 100%">
    <source src="/video/demo-maptour-zoom.mp4" type="video/mp4">
    Your browser does not support the video tag. 
</video>

### Réglage du système de navigation

Le système de navigation réalisé par le précédent alternant n'était pas **tout à fait fonctionnel**, quand on était sur le premier point d'intérêt et que l'on cliquait sur le bouton précédent,
rien ne se passait, et quand on était sur le dernier point d'intérêt et que l'on clique sur le bouton suivant, rien ne se passait non plus.

J'ai donc corrigé ces fonctions pour qu'elles fonctionnent correctement, et j'ai également corrigé les conditions pour remettre l'ordre de passage à 1 si on dépasse le dernier point d'intérêt,
et à la dernière position si sur le premier point d'intérêt, on clique sur le bouton précédent.

```javascript
// Fonction générique permettant de trouver l'ID de la feature pour un Ordre donné
function getIdByOrdre(listFeatures, order) {
    for (var i = 0; i < listFeatures.features.length; i++) {
        if (listFeatures.features[i].properties.ordre == order) {
            return listFeatures.features[i].properties.id;
        }
    }
    return null;
}

/**
 * Retourne la feature correspondant à l'index donné
 * @param listFeatures - Les features
 * @param index - L'index de la feature
 * @returns {*|null} - La feature correspondant à l'index donné
 */
function getFeatureByIndex(listFeatures, index) {
    for (let i = 0; i < listFeatures.features.length; i++) {
        if (listFeatures.features[i].properties.id === index) {
            return listFeatures.features[i];
        }
    }
    return null;
}
```

### Amélioration de l'affichage des informations des points d'intérêt

À la demande de mon maître d'apprentissage, j'ai amélioré l'affichage des informations des points d'intérêt, l'image est affichée en grand et prend toute la largeur de la popup.
Le copyright de l'image est affiché en dessous de l'image en tout petit, le titre du point d'intérêt est affiché en grand et en gras, 
et la description du point d'intérêt est affichée en dessous du titre.

Cela rend beaucoup mieux que l'affichage proposé par défaut par **Lizmap**.

<img style="margin: 0 auto" src="/img/maptour_capture_infos.PNG?url">

