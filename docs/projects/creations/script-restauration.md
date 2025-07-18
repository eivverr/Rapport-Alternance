---
prev: "Projets créés | Puzzle54"
next: "Projets créés | OGCviewer"
---

# Script de restauration des tables de la base de données

Un de mes collègues m'a demandé de créer un script **bash**[^1] permettant de restaurer des données ou une structure de table à partir d'un fichier de sauvegarde.
Cela permettrait de gagner du temps et d'éviter d'écrire les requêtes **PSQL** à la main, aussi, car le logiciel utilisé est parfois lent.

## Introduction

Ce script permet de **restaurer** des données ou une structure de table à partir d'un fichier de sauvegarde (format **.tar.gz** ou **.sql.gz**).

<CustomContainer type="info">
<p>
Vous trouverez le code <strong>complet</strong> du script dans la <a href="/annexe/codes/script-restauration">page suivante</a>.
</p>
<p>
Je ne suis pas expert en <b>bash</b>, mais j'ai essayé de faire un script qui soit <b>lisible</b> et <b>compréhensible</b>.
</p>
</CustomContainer>

### Objectifs

Voici donc ce que doit permettre de faire le script :

* Choisir un fichier de sauvegarde à restaurer (format `.tar.gz` ou `.sql.gz`)
* Choisir si l'on veut restaurer la **structure** de la table ou les **données**, ou les deux
* Choisir le schéma de la base de données
* Choisir la table à restaurer (parmi celles du schéma choisi)
* Exécuter la restauration en fonction des choix précédents

## Fonctionnement

Le script se déroule en plusieurs étapes :

1. **Choix du fichier de sauvegarde** :
   * affiche la liste des fichiers de sauvegarde disponibles (format `.tar.gz` ou `.sql.gz`) 
   * l'utilisateur doit choisir un fichier de sauvegarde à restaurer, en entrant le nom du fichier ou le numéro correspondant
   * vérifie que le fichier choisi existe (sinon, retour à l'étape 1)
   * demande de confirmer le choix du fichier de sauvegarde (sinon, retour à l'étape 1)
2. **Choix du mode de restauration** :
   * l'utilisateur doit choisir si l'on veut restaurer la **structure** de la table, les **données**, ou les **deux**
3. **Choix de la table à restaurer** :
   * affiche la liste des schémas de la base de données (sauf les schémas **pg_catalog** et **information_schema**)
   * l'utilisateur doit choisir un schéma, en entrant le nom du schéma ou le numéro correspondant (public par défaut)
   * vérifie que le schéma choisi existe (sinon, retour au choix du schéma)
   * affiche la liste des tables du schéma choisi
   * l'utilisateur doit choisir une table, en entrant le nom de la table ou le numéro correspondant
   * vérifie que la table choisie existe (sinon, retour au choix du nom de la table)
4. **Restauration de la table** :
   * si le répertoire contenant les fichiers `.sql` à exécuter n'existe pas, il est créé
   * décompresse le fichier de sauvegarde puis copie la structure et/ou les données de la table choisie dans un fichier `.sql`
   1. Si l'utilisateur a choisi de restaurer les **données** :
      * défini le `search_path` pour le schéma choisi
      * vide la table choisie avec `TRUNCATE`
      * exécute le fichier `.sql` contenant les données de la table
   2. Si l'utilisateur a choisi de restaurer la **structure** :
      * exécute le fichier `.sql` contenant la structure de la table
      * défini le `search_path` pour le schéma choisi
      * récupère le propriétaire de la table d'origine
      * change le propriétaire de la table restaurée pour qu'il soit le même que celui de la table d'origine
      * donne tous les droits sur la table restaurée à l'utilisateur courant avec `GRANT ALL ON`
   3. Si l'utilisateur a choisi de restaurer les **deux** :
      * fait la même chose que pour la restauration de la structure, mais copie aussi les données de la table dans le fichier `.sql`
   * affiche un message de confirmation pour chaque étape, permettant de vérifier que tout s'est bien passé et de savoir potentiellement quelle requête a échoué

### Exemple d'utilisation

<video controls muted autoplay loop style="margin: 0 auto; max-width: 100%">
    <source src="/video/demo-script-restauration.mp4" type="video/mp4">
    Your browser does not support the video tag. 
</video>

[^1]: Bash est un langage de script utilisé pour **automatiser** des tâches courantes dans les systèmes d'exploitation **Unix** et **Linux**.