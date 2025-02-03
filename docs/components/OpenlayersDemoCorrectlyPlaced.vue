<script setup>
import OpenlayersMap from "./OpenlayersMap.vue";

const id = "demo-correctly-placed";

// Initialiser la carte OpenLayers
function initOpenLayersMap() {

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

    let styleHidden = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'transparent'
        })
    });

    function styleFound(feature) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'black'
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 155, 0)'
            }),
            text: styleText(feature)
        });
    }

    let layerDepartement = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
            format: new ol.format.GeoJSON()
        })
    });

    let layerReference = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/cantons-54-meurthe-et-moselle.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: styleHidden
    });

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
            layerReference,
            layerCantons,
        ],
        view: new ol.View({
            center: [0, 0],
            zoom: 6,
            minZoom: 6,
            maxZoom: 10,
        }),
    });

    // Fonction pour mélanger les pièces du puzzle
    function randomizePuzzlePieces(features) {
        features.forEach((feature) => {
            // Déplace la pièce du puzzle aléatoirement
            let geometry = feature.getGeometry();
            let deltaX = Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000;
            let deltaY = Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000;
            geometry.translate(deltaX, deltaY);
        });
    }

    // Fonction pour vérifier si une pièce du puzzle est bien placée
    function checkPuzzlePieceIsCorrectlyPlaced(puzzlePiece) {
        let referencePiecesSource = layerReference.getSource();
        let puzzlePiecesSource = layerCantons.getSource();

        // Récupère les nouvelles coordonnées de la pièce du puzzle
        let newExtent = puzzlePiece.getGeometry().getExtent();

        // Récupère les anciennes coordonnées de la pièce du puzzle
        let id = puzzlePiece.getId();   // Récupère l'identifiant de la pièce du puzzle
        let oldExtent = referencePiecesSource.getFeatures()[id].getGeometry().getExtent();

        // Calcule la différence entre les anciennes et les nouvelles coordonnées
        let difference =
            Math.abs(newExtent[0] - oldExtent[0]) +
            Math.abs(newExtent[1] - oldExtent[1]) +
            Math.abs(newExtent[2] - oldExtent[2]) +
            Math.abs(newExtent[3] - oldExtent[3]);

        // Vérifie si la pièce est bien placée
        if (difference <= 10000) {
            // Met à jour le style de la pièce de référence
            referencePiecesSource.getFeatures()[id].setStyle(styleFound);

            // Enlève la pièce du puzzle trouvé
            puzzlePiecesSource.removeFeature(puzzlePiece);
        }
    }

    // Interaction de sélection des pièces du puzzle
    let selectPiecesPuzzle = new ol.interaction.Select({
        layers: [layerCantons]
    });

    // Interaction de déplacement des pièces du puzzle
    let translatePiecesPuzzle = new ol.interaction.Translate({
        features: selectPiecesPuzzle.getFeatures()
    });

    // Événement de fin de déplacement d'une pièce du puzzle
    translatePiecesPuzzle.on('translateend', function(event) {
        let puzzlePiece = event.features.item(0);
        checkPuzzlePieceIsCorrectlyPlaced(puzzlePiece);
    });

    // Ajout des interactions à la carte
    map.addInteraction(selectPiecesPuzzle);
    map.addInteraction(translatePiecesPuzzle);

    let sourceDepartement = layerDepartement.getSource();
    sourceDepartement.once('featuresloadend', function() {
        let feature = sourceDepartement.getFeatures()[0];
        map.getView().fit(feature.getGeometry(), {padding: [100, 100, 100, 100]});
    });

    let sourceReference = layerReference.getSource();
    sourceReference.once('featuresloadend', function() {
        const features = sourceReference.getFeatures();
        for (let i = 0; i < features.length; i++) {
            features[i].setId(i);
        }
    });

    let sourceCantons = layerCantons.getSource();
    sourceCantons.once('featuresloadend', function() {
        const features = sourceCantons.getFeatures();
        for (let i = 0; i < features.length; i++) {
            features[i].setId(i);
        }
        randomizePuzzlePieces(features);
    });
}
</script>

<template>
    <openlayers-map :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>