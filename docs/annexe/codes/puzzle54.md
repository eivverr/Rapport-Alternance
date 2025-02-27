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

[Retour à la réalisation du projet ↩︎](/projects/creations/puzzle54/realisation#afficher-les-donnees-geojson-sur-la-carte)

## Modifier l'apparence des pièces du puzzle

::: code-group

```javascript [styles]
// Style du texte, récupère le nom de la feature
function styleText(feature) { // [!code ++]
    return new ol.style.Text({ // [!code ++]
        font: '12px Calibri,sans-serif', // [!code ++]
        fill: new ol.style.Fill({ // [!code ++]
            color: 'black' // [!code ++]
        }), // [!code ++]
        stroke: new ol.style.Stroke({ // [!code ++]
            color: 'white', // [!code ++]
            width: 3 // [!code ++]
        }), // [!code ++]
        // Récupère le nom de la feature dans ces propriétés
        text: feature.get('nom'), // [!code ++]
        overflow: true // [!code ++]
    }); // [!code ++]
} // [!code ++]

// Style des cantons
function styleCanton(feature) { // [!code ++]
    return new ol.style.Style({ // [!code ++]
        fill: new ol.style.Fill({ // [!code ++]
            color: 'green' // [!code ++]
        }), // [!code ++]
        stroke: new ol.style.Stroke({ // [!code ++]
            color: 'black', // [!code ++]
            width: 1 // [!code ++]
        }), // [!code ++]
        text: styleText(feature) // [!code ++]
    }); // [!code ++]
} // [!code ++]
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

[Retour à la réalisation du projet ↩︎](/projects/creations/puzzle54/realisation#modifier-l-apparence-des-pieces-du-puzzle)

## Permettre de déplacer les pièces du puzzle

::: code-group

```javascript [interactions]
// Interaction de sélection des pièces du puzzle
let selectPiecesPuzzle = new ol.interaction.Select({ // [!code ++]
    // Sélectionne les features du layerCantons
    layers: [layerCantons] // [!code ++]
}); // [!code ++]

// Interaction de déplacement des pièces du puzzle
let translatePiecesPuzzle = new ol.interaction.Translate({ // [!code ++]
    // Déplace les features sélectionnées par l'interaction selectPiecesPuzzle
    features: selectPiecesPuzzle.getFeatures() // [!code ++]
}); // [!code ++]
```

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

[Retour à la réalisation du projet ↩︎](/projects/creations/puzzle54/realisation#permettre-de-deplacer-les-pieces-du-puzzle)

## Créer notre puzzle

::: code-group

```javascript [fonctions]
// Fonction pour mélanger les pièces du puzzle
function randomizePuzzlePieces(features) { // [!code ++]
    features.forEach((feature) => { // [!code ++]
        // Déplace la pièce du puzzle aléatoirement
        let geometry = feature.getGeometry(); // [!code ++]
        let deltaX = Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000; // [!code ++]
        let deltaY = Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000; // [!code ++]
        geometry.translate(deltaX, deltaY); // [!code ++]
    }); // [!code ++]
} // [!code ++]

// Fonction pour vérifier si une pièce du puzzle est bien placée
function checkPuzzlePieceIsCorrectlyPlaced(puzzlePiece) { // [!code ++]
    let referencePiecesSource = layerReference.getSource(); // [!code ++]
    let puzzlePiecesSource = layerCantons.getSource(); // [!code ++]

    // Récupère les nouvelles coordonnées de la pièce du puzzle
    let newExtent = puzzlePiece.getGeometry().getExtent(); // [!code ++]

    // Récupère les anciennes coordonnées de la pièce du puzzle
    let id = puzzlePiece.getId();   // Récupère l'identifiant de la pièce du puzzle // [!code ++]
    let oldExtent = referencePiecesSource.getFeatures()[id].getGeometry().getExtent(); // [!code ++]

    // Calcule la différence entre les anciennes et les nouvelles coordonnées
    let difference = // [!code ++]
        Math.abs(newExtent[0] - oldExtent[0]) + // [!code ++]
        Math.abs(newExtent[1] - oldExtent[1]) + // [!code ++]
        Math.abs(newExtent[2] - oldExtent[2]) + // [!code ++]
        Math.abs(newExtent[3] - oldExtent[3]); // [!code ++]

    // Vérifie si la pièce est bien placée
    if (difference <= 10000) { // [!code ++]
        // Met à jour le style de la pièce de référence
        referencePiecesSource.getFeatures()[id].setStyle(styleFound); // [!code ++]

        // Enlève la pièce du puzzle trouvé
        puzzlePiecesSource.removeFeature(puzzlePiece); // [!code ++]
    }
}
```

```javascript [interactions]
// Interaction de sélection des pièces du puzzle
let selectPiecesPuzzle = new ol.interaction.Select({
    // Sélectionne les features du layerCantons
    layers: [layerCantons]
});

// Interaction de déplacement des pièces du puzzle
let translatePiecesPuzzle = new ol.interaction.Translate({
    // Déplace les features sélectionnées par l'interaction selectPiecesPuzzle
    features: selectPiecesPuzzle.getFeatures()
});

// Événement de fin de déplacement d'une pièce du puzzle
translatePiecesPuzzle.on('translateend', function(event) { // [!code ++]
    let puzzlePiece = event.features.item(0); // [!code ++]
    checkPuzzlePieceIsCorrectlyPlaced(puzzlePiece); // [!code ++]
});
```

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

let styleHidden = new ol.style.Style({ // [!code ++]
    fill: new ol.style.Fill({ // [!code ++]
        color: 'transparent' // [!code ++]
    }) // [!code ++]
}); // [!code ++]

function styleFound(feature) { // [!code ++]
    return new ol.style.Style({ // [!code ++]
        stroke: new ol.style.Stroke({ // [!code ++]
            color: 'black' // [!code ++]
        }), // [!code ++]
        fill: new ol.style.Fill({ // [!code ++]
            color: 'rgba(255, 155, 0)' // [!code ++]
        }), // [!code ++]
        text: styleText(feature) // [!code ++]
    }); // [!code ++]
} // [!code ++]
```

```javascript [layers]
let layerDepartement = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
        format: new ol.format.GeoJSON()
    })
});

let layerReference = new ol.layer.Vector({ // [!code ++]
    source: new ol.source.Vector({ // [!code ++]
        url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/cantons-54-meurthe-et-moselle.geojson', // [!code ++]
        format: new ol.format.GeoJSON() // [!code ++]
    }), // [!code ++]
    style: styleHidden // [!code ++]
}); // [!code ++]

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
        layerReference, // [!code ++]
        layerCantons,
    ],
    view: new ol.View({
        center: [0, 0],
        zoom: 6,
        minZoom: 6,
        maxZoom: 10,
    }),
});

// Ajout des interactions à la carte
map.addInteraction(selectPiecesPuzzle);
map.addInteraction(translatePiecesPuzzle);

let sourceDepartement = layerDepartement.getSource();
sourceDepartement.once('featuresloadend', function() {
    let feature = sourceDepartement.getFeatures()[0];
    map.getView().fit(feature.getGeometry(), {padding: [100, 100, 100, 100]});
});

let sourceReference = layerReference.getSource(); // [!code ++]
sourceReference.once('featuresloadend', function() { // [!code ++]
    const features = sourceReference.getFeatures(); // [!code ++]
    for (let i = 0; i < features.length; i++) { // [!code ++]
        features[i].setId(i); // [!code ++]
    } // [!code ++]
}); // [!code ++]

let sourceCantons = layerCantons.getSource(); // [!code ++]
sourceCantons.once('featuresloadend', function() { // [!code ++]
    const features = sourceCantons.getFeatures(); // [!code ++]
    for (let i = 0; i < features.length; i++) { // [!code ++]
        features[i].setId(i); // [!code ++]
    } // [!code ++]
    randomizePuzzlePieces(features); // [!code ++]
}); // [!code ++]
```

:::

[Retour à la réalisation du projet ↩︎](/projects/creations/puzzle54/realisation#creer-notre-puzzle)