<script setup>
import OpenlayersDemo from './components/OpenlayersDemo.vue';
</script>

# Veille technologique

## Trouver une bibliothèque ou un plugin pour réaliser le projet

N'ayant jamais réalisé de projet de **puzzle en ligne**, j'ai dû chercher une bibliothèque ou un plugin qui me permettrait de réaliser ce type de projet.
De préférence, il fallait que ce soit une bibliothèque **open source** pour pouvoir l'utiliser sans restriction.

Si possible, il fallait aussi trouver des exemples de projets similaires pour voir comment ils étaient réalisés, et si on pouvait s'en inspirer.

### Exemple de projet similaires existants

Par hasard en se baladant sur internet, mon maître d'apprentissage a trouvé un [projet de puzzle en ligne](http://ol-puzzle.s3-website-eu-west-1.amazonaws.com/) 
qui ressemble à ce que l'on voulait faire.
Il me serra utile pour me servir de référence. 

Ce projet a été réalisé avec la bibliothèque **OpenLayers**, c'est d'ailleurs ce qu'utilise **Lizmap** pour afficher les cartes, 
ce qui pourrait potentiellement permettre de surcharger un projet **Lizmap** pour ajouter une carte **OpenLayers** (spoiler : non, ça ne fonctionne pas).

On décide donc d'utiliser **OpenLayers** pour réaliser le projet.

## Présentation d'OpenLayers

<img style="margin: 0 auto" src="/img/openlayers.png?url">

Développé le 26 juin 2006 par la [Fondation Open Source Geospatial](https://www.osgeo.org/) (organisation non gouvernementale fondée en 2006), 
[OpenLayers](https://openlayers.org/) est une bibliothèque **JavaScript** **open source** qui permet d'afficher des **cartes interactives** dans un navigateur web.
Cette bibliothèque est sous **license BSD**[^1], ce qui signifie que l'on peut réutiliser tout ou une partie du logiciel sans restriction, qu'il soit pour un usage commercial ou non.

Il a longtemps été utilisé par [OpenStreetMap](https://www.openstreetmap.org/#map=6/46.45/2.21), 
un projet **collaboratif** de **cartographie en ligne** qui vise à constituer une base de données géographiques libre du monde,
qui utilise maintenant [Leaflet](https://leafletjs.com/), une autre bibliothèque **JavaScript open source** pour afficher des cartes interactives.

**OpenLayers** est une bibliothèque **très complète**, elle permet de réaliser des cartes **interactives** avec des **données géographiques** (GeoRSS, KML, GML, GeoJSON, etc.).
Le logiciel possède également une [API](https://openlayers.org/en/latest/apidoc/) et une [documentation](https://openlayers.org/doc/) très complète, 
ainsi que de nombreux [exemples](https://openlayers.org/en/latest/examples/) pour apprendre à l'utiliser, ce qui facilite **énormément** son utilisation (contrairement à **Lizmap**...).
En plus ça tombe bien, les données de l'**api** sont en GeoJSON[^2].

### Apprendre à utiliser OpenLayers

Grâce à l'**API**, la **documentation** et les **exemples** d'**OpenLayers**, j'ai pu apprendre très facilement à utiliser cette bibliothèque pour réaliser le projet.
De plus, j'ai pu m'inspirer du projet **World Puzzle** (site de puzzle en ligne trouvé plus tôt) pour m'aider à réaliser le projet.

Les seuls problèmes que j'ai rencontrés avec **OpenLayers** sont les problèmes liés à **Lizmap** qui n'accèpte pas les `import` de fichiers **JavaScript** externes,
je ne peux donc pas installer **OpenLayers** avec `npm` et l'inclure dans mon projet, je dois inclure le fichier **JavaScript** d'**OpenLayers** directement dans le fichier **HTML**.

Pour contourner ce problème, j'ai utilisé un script pour charger **OpenLayers** dynamiquement dans la page.

````javascript
// Charger la bibliothèque OpenLayers
let script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js";
script.onload = function() {
    // Fonction pour initialiser la carte OpenLayers
    initOpenLayersMap();
    console.log("OpenLayers chargé.");
};
script.onerror = function() {
    console.error("Erreur de chargement d'OpenLayers.");
};
document.head.appendChild(script);
````

<CustomContainer type="info">
<p>
Comme <b>Lizmap</b> n'aime pas les <code>import</code>, pour pouvoir organiser le projet avec plusieurs fichiers, 
je dois utiliser <code>window.</code>, au lieu de <code>export</code>, suivit de ma fonction ou de ma variable pour les rendre globales et pouvoir les utiliser dans d'autres fichiers.
</p>
</CustomContainer>

#### Exemple de code

Voici un exemple de code pour initialiser une carte **OpenLayers** :

````javascript
// Initialiser la carte OpenLayers
function initOpenLayersMap() {
    // Créer la carte OpenLayers
    const map = new ol.Map({
        // Cible de la carte, l'id de l'élément HTML où la carte sera affichée
        target: "map",
        // Ajoute une couche
        layers: [
            new ol.layer.Tile({
                // Source de la couche, ici une source OpenStreetMap
                source: new ol.source.OSM(),
            }),
        ],
        // Vue de la carte
        view: new ol.View({
            // Coordonnées du centre de la carte
            center: ol.proj.fromLonLat([2.35, 48.85]),
            // Niveau de zoom de la carte au chargement
            zoom: 12,
        }),
    });
}
````

#### Démo

**Démo d'OpenLayers** avec le code ci-dessus :

<OpenlayersDemo />

[^1]: La **license BSD** (Berkeley Software Distribution License) est une licence libre utilisée pour la distribution de logiciels. 
Elle permet de réutiliser tout ou une partie du logiciel sans restriction, qu'il soit intégré dans un logiciel **libre** ou **propriétaire**.

[^2]: **GeoJSON** est un format ouvert d'encodage d'ensemble de données géospatiales simples utilisant la norme **JSON**.
Il permet de décrire des données de type **point**, **ligne**, **chaîne de caractères**, **polygone**, 
ainsi que des ensembles et sous-ensembles de ces types de données et d'y ajouter des attributs d'information qui ne sont pas spatiales.