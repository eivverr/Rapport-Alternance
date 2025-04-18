# Veille technologique

## Choix des technologies

Pour réaliser ce projet, il fallait choisir les technologies à utiliser pour le frontend et le backend.
Personnellement, au moment de la réalisation, pour le frontend, je connaissais **Html**, **Css**, **Javascript** et **Vue.js**, pour le backend, je ne connaissais que **PHP**.

Cependant, mes collègues ne connaissent que **Python** comme langage de programmation, et ils préfèrent créer cette application web avec **Python** si possible.
De nom, je connais **Tkinter** pour faire une interface graphique avec **Python** et pour le web, je connais **Flask**.

Comme je sais bien faire des interfaces web avec les classiques **Html**/**Css** et **Javascript**, je vais choisir **Vue.js** pour le frontend.
Pour le backend, je vais donc choisir **Flask**, pour permettre à mes collègues de comprendre le code et de pouvoir le modifier facilement si besoin.

### Vue.js pour le frontend

<img style="margin: 0 auto" width="300px" src="/img/Vue_logo.png?url">

[Vue.js](https://v3.vuejs.org/) est un framework[^1] **JavaScript** open-source[^2] pour construire des interfaces utilisateur et des applications **monopages**.
Créé par **Evan You**, il est maintenu par lui et le reste des membres actifs de l'équipe principale travaillant sur le projet et son écosystème.

Il est conçu pour être adaptable et peut être intégré dans des projets existants sans problème. 
Il utilise une approche réactive pour la gestion de l'état et permet de créer des composants réutilisables.

### Flask pour le backend

<img style="margin: 0 auto" src="/img/Flask_logo.png?url">

[Flask](https://flask.palletsprojects.com/en/stable/) est un micro framework open-source de développement web en **Python**.
Créé initialement par **Armin Ronacher** comme étant un poisson d'avril. 
Le souhait de Ronacher était de réaliser un framework web contenu dans un seul fichier **Python** mais pouvant maintenir des applications très demandées.
Il est léger et flexible, ce qui le rend idéal pour créer des applications web simples et rapides.

Ici, il est utilisé pour créer une sorte d'API REST pour le projet.
Cette API permet de gérer les requêtes HTTP, des commandes shell ou des scripts **Python** et de renvoyer des réponses au format **JSON**.

[^1]: Le terme **framework** désigne un ensemble d'outils et de bibliothèques qui facilitent le développement d'applications en fournissant une structure de base et des fonctionnalités prêtes à l'emploi. 

[^2]: La désignation **open source**, s'applique aux logiciels dont la licence respecte des critères précisément établis par l'[Open Source Initiative](https://fr.wikipedia.org/wiki/Open_Source_Initiative),
c'est-à-dire les possibilités de **libre redistribution**, d'**accès au code source** et de **création de travaux dérivés**.