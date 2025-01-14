# Codes du projet Puzzle54

## Afficher les données GeoJSON sur la carte

::: code-group

```javascript [layers]
// Création d'un layer avec des données GeoJSON
let layer = new ol.layer.Vector({
    // Source des données GeoJSON
    source: new ol.source.Vector({
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
        format: new ol.format.GeoJSON()
    })
});
```

```javascript [map]
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

:::

[Retour à la réalisation du projet ↩︎](/puzzle54/realisation#afficher-les-donnees-geojson-sur-la-carte)

## Modifier l'apparence des pièces du puzzle

::: code-group

```javascript [styles]
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
```

```javascript [layers]
let layerDepartement = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
        format: new ol.format.GeoJSON()
    })
});

// Layer des cantons
let layerCantons = new ol.layer.Vector({ // [!code ++]
    source: new ol.source.Vector({ // [!code ++]
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/cantons-54-meurthe-et-moselle.geojson', // [!code ++]
        format: new ol.format.GeoJSON() // [!code ++]
    }), // [!code ++]
    style: styleCanton // [!code ++]
}); // [!code ++]
```

```javascript [map]
const map = new ol.Map({
    target: "map",
    layers: [
        layerDepartement, // [!code ++]
        layerCantons, // [!code ++]
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

:::

[Retour à la réalisation du projet ↩︎](/puzzle54/realisation#modifier-l-apparence-des-pieces-du-puzzle)

## Permettre de déplacer les pièces du puzzle

::: code-group

```javascript [styles]
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
        text: feature.get('nom'),
        overflow: true
    });
}

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
```

```javascript [layers]
let layerDepartement = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
        format: new ol.format.GeoJSON()
    })
});

let layerCantons = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/cantons-54-meurthe-et-moselle.geojson',
        format: new ol.format.GeoJSON()
    }),
    style: styleCanton
});
```

```javascript [map]
const map = new ol.Map({
    target: "map",
    layers: [
        layerDepartement,
        layerCantons,
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 6,
        minZoom: 6,
        maxZoom: 10,
    }),
});

// Interaction de sélection des pièces du puzzle
let selectPiecesPuzzle = new ol.interaction.Select({ // [!code ++]
    layers: [layerCantons] // [!code ++]
}); // [!code ++]

// Interaction de déplacement des pièces du puzzle
let translatePiecesPuzzle = new ol.interaction.Translate({ // [!code ++]
    features: selectPiecesPuzzle.getFeatures() // [!code ++]
}); // [!code ++]

// Ajout des interactions à la carte
map.addInteraction(selectPiecesPuzzle); // [!code ++]
map.addInteraction(translatePiecesPuzzle); // [!code ++]

let sourceDepartement = layerDepartement.getSource();
sourceDepartement.once('featuresloadend', function() {
    let feature = sourceDepartement.getFeatures()[0];
    map.getView().fit(feature.getGeometry(), {padding: [100, 100, 100, 100]});
});
```

:::

[Retour à la réalisation du projet ↩︎](/puzzle54/realisation#permettre-de-deplacer-les-pieces-du-puzzle)