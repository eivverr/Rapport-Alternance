<script setup>
import { Map } from "ol";
import { View } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { GeoJSON } from "ol/format";
import { Select, Translate } from "ol/interaction";
import { Fill, Stroke, Style, Text } from "ol/style";

const id = "demo-correctly-placed";

// Initialiser la carte OpenLayers
function initOpenLayersMap() {

    // Style du texte, récupère le nom de la feature
    function styleText(feature) {
        return new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({
                color: 'black'
            }),
            stroke: new Stroke({
                color: 'white',
                width: 3
            }),
            text: feature.get('nom'),
            overflow: true
        });
    }

    function styleCanton(feature) {
        return new Style({
            fill: new Fill({
                color: 'green'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 1
            }),
            text: styleText(feature)
        });
    }

    let styleHidden = new Style({
        fill: new Fill({
            color: 'transparent'
        })
    });

    function styleFound(feature) {
        return new Style({
            stroke: new Stroke({
                color: 'black'
            }),
            fill: new Fill({
                color: 'rgba(255, 155, 0)'
            }),
            text: styleText(feature)
        });
    }

    let layerDepartement = new VectorLayer({
        source: new VectorSource({
            url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
            format: new GeoJSON()
        })
    });

    let layerReference = new VectorLayer({
        source: new VectorSource({
            url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/cantons-54-meurthe-et-moselle.geojson',
            format: new GeoJSON()
        }),
        style: styleHidden
    });

    let layerCantons = new VectorLayer({
        source: new VectorSource({
            url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/cantons-54-meurthe-et-moselle.geojson',
            format: new GeoJSON()
        }),
        style: styleCanton
    });

    const map = new Map({
        target: id,
        layers: [
            layerDepartement,
            layerReference,
            layerCantons,
        ],
        view: new View({
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
    let selectPiecesPuzzle = new Select({
        layers: [layerCantons]
    });

    // Interaction de déplacement des pièces du puzzle
    let translatePiecesPuzzle = new Translate({
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
    <OpenlayersMap :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>