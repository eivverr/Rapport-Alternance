<script setup>
import CustomContainer from '/components/CustomContainer.vue';
import OpenlayersDemoGeojson from '/components/OpenlayersDemoGeojson.vue';
import OpenlayersDemoStyle from '/components/OpenlayersDemoStyle.vue';
import OpenlayersDemoInteraction from '/components/OpenlayersDemoInteraction.vue';
import OpenlayersDemoPuzzle from '/components/OpenlayersDemoPuzzle.vue';
</script>

# Réaliser un puzzle en web avec des données GeoJSON

<custom-container type="info">
<p>
Pour les démonstrations de code, je vais utiliser des données <b>GeoJSON</b> disponible sur le site <a href="https://france-geojson.gregoiredavid.fr">France GeoJSON</a>.
</p>
<p>
De plus, les codes seront disponibles dans la partie <a href="/annexe/codes/puzzle54">Codes du projet Puzzle54</a> pour plus de clarté.
</p>
</custom-container>

Comme expliqué précédemment, il est possible d'afficher des données **GeoJSON** sur une carte **OpenLayers**, ce qui est parfait, 
car les données de l'**api** du **Conseil Départemental de Meurthe-et-Moselle** sont en **GeoJSON**.

## Afficher les données GeoJSON sur la carte

Pour afficher les données **GeoJSON** sur la carte, il faut définir un `layer.Vector` avec une **source** de type `source.Vector` et un **format** en `format.GeoJSON`.
Dans la map, on peut définir ou centrer la vue sur les données **GeoJSON** avec le paramètre `center` de `view`, cependant, il faut mettre des nombres en **brutes**, 
or, il serait plus intéressant de centrer sur les données **GeoJSON** directement peu importe les données pour permettre au projet de s'adapter à n'importe quelles données.

Pour cela, on utilise la fonction `fit()` de `map.getView()`, 
qui prend en paramètre la **géométrie** de la **feature**[^1] à centrer et un **padding** pour laisser de l'espace autour de la **feature**.

[Code de la démonstration](/annexe/codes/puzzle54#afficher-les-donnees-geojson-sur-la-carte) et le résultat :

<openlayers-demo-geojson />

## Modifier l'apparence des pièces du puzzle

Maintenant que nous avons notre contour du département de **Meurthe-et-Moselle**, nous allons pouvoir afficher les **cantons** du département.
Pour cela rien de bien compliqué, il suffit de créer un autre `layer.Vector` comme précédemment, mais en changeant l'`url` de la **source** pour afficher les **cantons**.
Ensuite, on ajoute simplement ce `layer.Vector` à la carte.

Pour modifier l'apparence des pièces du puzzle, donc les **cantons**, on peut définir un **style** de type `style.Style` dans le `layer.Vector`.
Bon malheureusement, **OpenLayers** ne propose pas énormément de possibilités de personnalisation, mais on peut quand même changer la **couleur**, la **bordure** et afficher un **texte**.

[Code de la démonstration](/annexe/codes/puzzle54#modifier-l-apparence-des-pieces-du-puzzle) et le résultat :

<openlayers-demo-style />

## Permettre de déplacer les pièces du puzzle

Sur OpenLayers, il est possible d'ajouter des **interactions** à la carte ou à un `layer.Vector`
permettant à l'utilisateur de **déplacer** les **features** (les pièces du puzzle) sur la carte.

Ici, on va ajouter une **interaction** de type `interaction.Select` à notre `layer.Vector` des **cantons**,
qui va permettre de **sélectionner** une pièce du puzzle.
Ensuite pour les déplacer, on ajoute une **interaction** de type `interaction.Translate` sur la **feature** sélectionnée
via la **sélection** de l'**interaction** `Select`.
Pour finir, on ajoute les **interactions** à la carte.

[Code de la démonstration](/annexe/codes/puzzle54#permettre-de-deplacer-les-pieces-du-puzzle) 
et le résultat (cliquez sur une pièce pour pouvoir ensuite la déplacer) :

<openlayers-demo-interaction />

## Créer notre puzzle

Dans un premier temps, pour vérifier que les pièces sont bien placées, il faut que les pièces ne soient pas déjà placées correctement.
On va donc créer une fonction qui va déplacer de manière **aléatoire** les pièces du puzzle, cette fonction sera appelée au chargement des pièces.

Pour vérifier si les pièces sont bien placées, on va vérifier si les **features** sont à la **bonne position**.
Pour cela, on va ajouter un autre `layer` des cantons qui servira de référence, il ne sera pas visible, mais il va nous permettre de vérifier si les pièces sont bien placées.
Lors des chargements des `layer` cantons et référence, on attribut in **id** à chaque **feature** pour pouvoir les comparer.

N'étant pas une machine comme RoboCop, Terminator ou R2D2, on ne peut pas placer au **pixel près** les pièces,
on va donc ajouter un système d'**aimant** pour placer les pièces plus facilement.
Il suffit juste de calculer la différence entre la position de la pièce et la position de la référence,
et si la différence est inférieure à une certaine valeur, on dit que la pièce est bien placée.

Quand une pièce est bien positionnée, on la supprime et on change le style de la pièce de la référence,
c'est ce qui donne cet effet **d'aimant**.

[Code de la démonstration](/annexe/codes/puzzle54#creer-notre-puzzle) et le résultat :

<openlayers-demo-puzzle />

Et voilà, nous avons notre **puzzle en ligne**, le plus gros du travail est fait, si vous regardez le [projet](https://webcarto.infogeo54.fr/index.php/view/map?repository=public&project=puzzle_cd54),
vous verrez que le projet est plus complet, mais je ne vais pas parler des petites modifications que j'ai pu faire pour améliorer le projet.
Je ne pense pas que ce soit nécessaire de parler de comment ajouter un bouton, une popup, un menu, etc.
Ou de toutes les améliorations que j'ai pu faire pour rendre le projet plus **ergonomique** et **intuitif**. 
Bien évidemment, le projet est **responsive**, il s'adapte à la taille de l'écran.

[^1]: Dans **OpenLayers**, une **feature** est un élément géographique, comme un point, une ligne ou un polygone.
Une **feature** possède des **propriétés** et une **géométrie** qui permet de la dessiner sur la carte, 
elle peut également avoir des **valeurs** définit dans l'**api**, ce qui est pratique, 
car pas besoin de faire un `fetch` pour récupérer les données on peut les récupérer directement dans la **feature**.