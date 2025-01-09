<script setup>
import CustomContainer from '/components/CustomContainer.vue';
import OpenlayersDemoGeojson from '/components/OpenlayersDemoGeojson.vue';
import OpenlayersDemoStyle from '/components/OpenlayersDemoStyle.vue';
</script>

# Réalisation du projet

<custom-container type="info">
<p>
Pour les démonstrations de code, je vais utiliser des données <b>GeoJSON</b> disponible sur le site <a href="https://france-geojson.gregoiredavid.fr">France GeoJSON</a>.
</p>
<p>
De plus, les codes seront disponibles dans la partie <a href="/codes/puzzle54">Codes du projet Puzzle54</a> pour plus de clarté.
</p>
</custom-container>

## Réaliser un puzzle en web avec des données GeoJSON

Comme expliqué précédemment, il est possible d'afficher des données **GeoJSON** sur une carte **OpenLayers**, ce qui est parfait, 
car les données de l'**api** du **Conseil Départemental de Meurthe-et-Moselle** sont en **GeoJSON**.

### Afficher les données GeoJSON sur la carte

Pour afficher les données **GeoJSON** sur la carte, il faut définir un `layer.Vector` avec une **source** de type `source.Vector` et un **format** en `format.GeoJSON`.
Dans la map, on peut définir ou centrer la vue sur les données **GeoJSON** avec le paramètre `center` de `view`, cependant, il faut mettre des nombres en **brutes**, 
or, il serait plus intéressant de centrer sur les données **GeoJSON** directement peu importe les données pour permettre au projet de s'adapter à n'importe quelles données.

Pour cela, on utilise la fonction `fit()` de `map.getView()`, 
qui prend en paramètre la **géométrie** de la **feature**[^1] à centrer et un **padding** pour laisser de l'espace autour de la **feature**.

[Code de la démonstration](/codes/puzzle54#afficher-les-donnees-geojson-sur-la-carte) et le résultat :

<openlayers-demo-geojson />

### Modifier l'apparence des pièces du puzzle

Maintenant que nous avons notre contour du département de **Meurthe-et-Moselle**, nous allons pouvoir afficher les **cantons** du département.
Pour cela rien de bien compliqué, il suffit de créer un autre `layer.Vector` comme précédemment, mais en changeant l'`url` de la **source** pour afficher les **cantons**.
Ensuite, on ajoute simplement ce `layer.Vector` à la carte.

Pour modifier l'apparence des pièces du puzzle, donc les **cantons**, on peut définir un **style** de type `style.Style` dans le `layer.Vector`.
Bon malheureusement, **OpenLayers** ne propose pas énormément de possibilités de personnalisation, mais on peut quand même changer la **couleur**, la **bordure** et afficher un **texte**.

[Code de la démonstration](/codes/puzzle54#modifier-l-apparence-des-pieces-du-puzzle) et le résultat :

<openlayers-demo-style />

### Permettre de déplacer les pièces du puzzle



### Vérifier si les pièces sont bien placées

### Vérifier si le puzzle est terminé

[^1]: Dans **OpenLayers**, une **feature** est un élément géographique, comme un point, une ligne ou un polygone.
Une **feature** possède des **propriétés** et une **géométrie** qui permet de la dessiner sur la carte, 
elle peut également avoir des **valeurs** définit dans l'**api**, ce qui est pratique, 
car pas besoin de faire un `fetch` pour récupérer les données on peut les récupérer directement dans la **feature**.