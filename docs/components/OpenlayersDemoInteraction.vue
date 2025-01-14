<script setup>
import OpenlayersMap from "./OpenlayersMap.vue";

const id = "demo-interaction";

// Initialiser la carte OpenLayers
function initOpenLayersMap() {

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
        ],
        view: new ol.View({
            center: [0, 0],
            zoom: 6,
            minZoom: 6,
            maxZoom: 10,
        }),
    });

    // Interaction de sélection des pièces du puzzle
    let selectPiecesPuzzle = new ol.interaction.Select({
        layers: [layerCantons]
    });

    // Interaction de déplacement des pièces du puzzle
    let translatePiecesPuzzle = new ol.interaction.Translate({
        features: selectPiecesPuzzle.getFeatures()
    });

    // Ajout des interactions à la carte
    map.addInteraction(selectPiecesPuzzle);
    map.addInteraction(translatePiecesPuzzle);

    let sourceDepartement = layerDepartement.getSource();
    sourceDepartement.once('featuresloadend', function() {
        let feature = sourceDepartement.getFeatures()[0];
        map.getView().fit(feature.getGeometry(), {padding: [100, 100, 100, 100]});
    });
}
</script>

<template>
    <openlayers-map :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>