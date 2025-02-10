<script setup>
import CustomContainer from '/components/CustomContainer.vue'
</script>

# Script de restauration des tables de la base de données

## Introduction

Ce script permet de **restaurer** les tables de la base de données à partir d'un fichier de sauvegarde.
Il permet d'éviter de devoir écrire les **requêtes SQL** à la main tout en **facilitant** la restauration des tables.

<custom-container type="info">
<p>
Vous trouverez le code <strong>complet</strong> du script dans la <a href="./codes/script-restauration">page suivante</a>.
</p>
</custom-container>

### Objectifs

Comme dit précédemment, le script a pour objectif de **restaurer** les tables de la base de données à partir d'un fichier de sauvegarde,
il permet de gagner du temps et d'éviter les erreurs de saisie.

Pour ce faire, il faut utiliser un script **Bash**[^1] qui va **lire** le fichier de sauvegarde et **exécuter** les requêtes SQL.
Le script doit :
* Lire les fichiers de sauvegarde disponibles
* Afficher les fichiers de sauvegarde disponibles pour permettre à l'utilisateur de choisir le fichier à restaurer
* Demander à l'utilisateur de choisir le mode de restauration (extraction des données ou de la structure)
* Dans les 2 cas, le script doit demander à l'utilisateur de choisir le schéma et le nom de la table à restaurer
* Le script doit ensuite extraire les données ou la structure de la table choisie et les copier dans un nouveau fichier
  * Extraction des données :
    * La base de données choisie est vidée
    * Les données copiées dans un nouveau fichier sont insérées dans la base de données
  * Extraction de la structure : 
    * Une nouvelle table est créée avec la structure copiée du nouveau fichier

### Exemple d'utilisation

<custom-container type="todo">
<p>
Mettre vidéo de démonstration du script
</p>
</custom-container>

[^1]: Bash est un langage de script utilisé pour **automatiser** des tâches courantes dans les systèmes d'exploitation **Unix** et **Linux**.