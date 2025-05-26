# OGCViewer

<CustomContainer type="warning">
<p>
Ce projet est en cours de développement et n'est pas encore terminé. 
Les images/vidéos ne représentent pas la version finale du projet.
</p>
</CustomContainer>

## Introduction

Suite à la customisation de [l'atlas départemental de Meurthe-et-Moselle](/projects/upgrades/atlas), 
mon maître d'apprentissage s'est rendu compte qu'avec **Lizmap**, la customisation est très limitée.

Dans un premier temps, on a cherché à trouver si une alternative **open source** existait déjà pouvant faire la même chose que **Lizmap**
(afficher des couches de données sur une carte, avec un tableau de données, graphiques, etc.), mais en mieux et avec une interface plus agréable ou facilement customisable.
Mon maître d'apprentissage a trouvé un projet qui correspondait aux attentes : [Mviewer](https://mviewer.github.io/fr/).

### Présentation de Mviewer

<img style="margin: 0 auto" width="150px" src="/img/mviewer-logo.png?url">

**Mviewer** est une application cartographique initiée et développée par la **Région Bretagne** (*pas mal non ? C'est français !*). 
Le code source de cette application est librement réutilisable depuis 2014. 
De nombreuses collectivités mais également des entreprises, le secteur de la recherche et de l’enseignement utilisent librement cette application et participent à son évolution.

Ce projet est exactement ce qu'on cherchait, car il est **open source** et permet de créer des cartes interactives avec des couches de données,
des tableaux de données, des graphiques, etc.
Il possède également un générateur d'applications, [Mviewer studio](https://github.com/mviewer/mviewerstudio),
qui permet de créer des applications **Mviewer** facilement avec une interface graphique.

J'ai bien réussi à installer **Mviewer** et **Mviewer studio**, j'ai pu faire un projet et l'afficher sur un **serveur apache**[^1] de test.
Cependant, bien qu'on pouvait afficher les couches de données sur la carte, le clic sur les couches de données affichait un message d'erreur.
De plus, je n'avais pas la [fonctionnalité de personnalisation](https://mviewerstudio.readthedocs.io/fr/stable/doc_user/param_data.html#parametrer-une-fiche-dinformation)
de **Mviewer studio**, et je ne sais toujours pas pourquoi.

On s'est résolu à abandonner **Mviewer** et à créer notre propre application cartographique.

## Objectifs du projet

L'objectif de ce projet est de créer une application cartographique qui permet d'afficher des couches de données sur une carte,
de pouvoir cliquer sur les couches de données pour afficher des informations sur celles-ci,
et de pouvoir afficher des tableaux de données et des graphiques sur les couches de données (*en gros, faire la même chose que **Lizmap** mais en mieux*).

À la fin, il devra complétement remplacer l'[atlas départemental du service](https://infogeo54.fr/?page_id=1452).

## Missions

Cette application étant assez dense, je ne vais pas lister toutes les missions que j'ai réalisées (il y en a beaucoup !), 
je vais juste lister les plus importantes :

- [Afficher une carte avec des couches de données de type **WMS**](/projects/creations/ogcviewer/realisation#afficher-une-carte-avec-des-couches-de-donnees-wms)
- [Afficher un graphique sur les couches de données](/projects/creations/ogcviewer/realisation#afficher-un-graphique-sur-les-couches-de-donnees)
- [Permettre de modifier/ajouter des graphiques](/projects/creations/ogcviewer/realisation#permettre-de-modifier-ajouter-des-graphiques)
- [Connexion LDAP pour l'authentification des admins](/projects/creations/ogcviewer/realisation#connexion-ldap-pour-l-authentification-des-admins)

[^1]: Un serveur **Apache** est un logiciel de serveur web libre et open source, qui permet de diffuser des pages web sur Internet.