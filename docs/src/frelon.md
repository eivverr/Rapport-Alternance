# Frelon signalement 54

<script setup>
import CustomContainer from '/components/CustomContainer.vue'
</script>

<custom-container type="info">
<p>
<a target="_blank" href="https://webcarto.infogeo54.fr/index.php/view/map?repository=public&project=Frelon_signalement_public">Lien vers le projet</a> <i>(version publique)</i>.
</p>
<p>
La version présentée ici est la version <strong>Admin</strong> du projet, vous n'aurez donc pas accès à la carte des signalements et vous n'aurez que des images de l'interface pour illustrer les améliorations apportées.
</p>
</custom-container>

## Introduction

Le projet **Frelon signalement** est un projet de signalement de nids et de pièges à frelons, développé pour le **Conseil Départemental de Meurthe-et-Moselle** sur **Lizmap**.
Le projet a été réaliser par le précédent alternant, et j'ai repris le projet pour y apporter des améliorations visuelles.

La version **Admin** du projet permet d'ajouter, modifier ou de supprimer des signalements de nids de frelons ou de pièges à frelons sur une carte.
Tandis que la version **Public** ne permet que de consulter les signalements ajoutés sur la carte.

### Missions

Le problème majeur de l'application était l'interface qui n'était pas adaptée pour les écrans mobiles, 
et comme la plupart des utilisateurs utilisent leur smartphone pour ajouter des signalements, 
il était important d'adapter l'interface pour les écrans mobiles.

Mes missions sur ce projet ont été les suivantes :
- [Réglage de la popup d'aide au format mobile](#reglage-de-la-popup-d-aide-au-format-mobile)
- [Adaptation de l'interface pour les écrans mobiles](#adaptation-de-l-interface-pour-les-ecrans-mobiles)
    - [Boutons](#boutons)
    - [Formulaire](#formulaire)
- [Amélioration de l'affichage de la popup des couches](#amelioration-de-l-affichage-de-la-popup-des-couches)

## Améliorations

### Réglage de la popup d'aide au format mobile

Sur l'interface de la version **Admin** du projet, il y a un bouton **Aide** qui ouvre une popup d'aide qui montre une image permettant de différencier les frelons, guêpes et abeilles.
Elle montre aussi comment ajouter une présence de frelons ou un piège à frelons sur la carte.

Cependant, cette popup n'était pas adaptée pour les écrans mobiles, elle était trop grande et ne s'affichait pas correctement.
Le problème était que l'ancien alternant, qui n'était pas un développeur web, n'avait pas compris que **Lizmap** intègre [Bootstrap](https://getbootstrap.com/),
et donc il y avait des conflits entre les différents styles CSS, celui de **Bootstrap** et celui ajouté par l'ancien alternant.

J'ai donc dû adapter le style de la popup pour qu'elle s'affiche correctement sur les écrans mobiles, tout en prenant en compte les styles de **Bootstrap**.

<img style="margin: 0 auto" src="/img/frelon_capture_popup.PNG?url">

### Adaptation de l'interface pour les écrans mobiles

Pour adapter l'interface pour les écrans mobiles, j'ai dû modifier certains éléments de l'interface pour qu'ils s'affichent correctement sur les écrans mobiles.

#### Boutons

Les boutons de l'interface n'étaient pas adaptés pour les écrans mobiles, ils étaient trop grands et prenaient donc trop de place sur l'écran.
J'ai dû réduire la taille des boutons pour qu'ils s'affichent correctement sur les écrans mobiles, tout en faisant attention à ce qu'ils ne soient pas trop petits pour être cliquables.

<div style="display: flex; align-items: center; justify-content: space-around">
  <img src="/img/frelon_capture_boutons_2.PNG?url">
  <img src="/img/frelon_capture_boutons.PNG?url">
</div>

#### Formulaire

Avec **Lizmap**, les formulaires s'affichent sur le côté de l'écran, or cela n'est pas pratique pour les écrans mobiles.
J'ai donc dû modifier le style du formulaire pour qu'il prenne toute la largeur de l'écran, et qu'il soit plus facile à remplir sur les écrans mobiles.
Ensuite, lors d'un affichage d'un formulaire avec **Lizmap**, le bouton pour fermer le formulaire est une flèche qui vas vers la droite, ce qui n'est pas très intuitif en format mobile.
J'ai donc remplacé cette flèche par une simple croix pour fermer le formulaire.

<img style="margin: 0 auto" src="/img/frelon_capture_form.PNG?url">

### Amélioration de l'affichage de la popup des couches

Sur **Lizmap**, il est possible de choisir d'afficher ou non les couches de la carte (ex : la couche des nids de frelon, des pièges, référents local, etc.), 
cela ce fait via une popup qui s'ouvre en cliquant sur le bouton **Couche** en haut à droite de la carte.
Mon maître d'apprentissage m'a demandé de modifier cette popup pour qu'elle soit affiché au même endroit que les formulaires.

<custom-container type="warning">
<p>
Mettre vidéo de démonstration de l'amélioration de la popup des couches
</p>
</custom-container>