# Codes du projet Puzzle54

## Afficher les données GeoJSON sur la carte

```javascript
// Création d'un layer avec des données GeoJSON
let layer = new ol.layer.Vector({
    // Source des données GeoJSON
    source: new ol.source.Vector({
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
        format: new ol.format.GeoJSON()
    })
});

const map = new ol.Map({
    target: "map",
    layers: [
        layer   // Ajout du layer à la carte
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 6,
        minZoom: 6,
        maxZoom: 10,
    }),
});

// Zoom sur les données GeoJSON
let layerSource = layer.getSource();
// Attends que les features soient chargées, sinon la fonction ne fonctionne pas
layerSource.once('featuresloadend', function() {
    // Récupère la première feature (la seule dans notre cas)
    let feature = layerSource.getFeatures()[0];
    // Zoom sur la feature avec un padding de 100px
    map.getView().fit(feature.getGeometry(), {padding: [100, 100, 100, 100]});
});
```

[Retour à la réalisation du projet ↩︎](/puzzle54/realisation#afficher-les-donnees-geojson-sur-la-carte)

## Modifier l'apparence des pièces du puzzle

```javascript
let layerDepartement = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
        format: new ol.format.GeoJSON()
    })
});

// Style du texte, récupère le nom de la feature
function styleText(feature) {
    return new ol.style.Text({
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: 'black'
        }),
        stroke: new ol.style.Stroke({
            color: 'white',
            width: 3
        }),
        // Récupère le nom de la feature dans ces propriétés
        text: feature.get('nom'),
        overflow: true
    });
}

// Style des cantons
function styleCanton(feature) {
    return new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'green'
        }),
        stroke: new ol.style.Stroke({
            color: 'black',
            width: 1
        }),
        text: styleText(feature)
    });
}

// Layer des cantons
let layerCantons = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/cantons-54-meurthe-et-moselle.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: styleCanton
});

const map = new ol.Map({
    target: id,
    layers: [
        layerDepartement,
        layerCantons,
    ],  // /!\ Ordre important, le dernier layer est au dessus
    view: new ol.View({
        center: [0, 0],
        zoom: 6,
        minZoom: 6,
        maxZoom: 10,
    }),
});

let sourceDepartement = layerDepartement.getSource();
sourceDepartement.once('featuresloadend', function() {
    let feature = sourceDepartement.getFeatures()[0];
    map.getView().fit(feature.getGeometry(), {padding: [100, 100, 100, 100]});
});
```

[Retour à la réalisation du projet ↩︎](/puzzle54/realisation#modifier-l-apparence-des-pieces-du-puzzle)