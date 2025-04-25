<script setup>
import { Map } from "ol";
import { View } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { GeoJSON } from "ol/format";
import { Fill, Stroke, Style, Text } from "ol/style";

const id = "demo-style";

// Initialiser la carte OpenLayers
function initOpenLayersMap() {

    let layerDepartement = new VectorLayer({
        source: new VectorSource({
            url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
            format: new GeoJSON()
        })
    });

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

    // Layer des cantons
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
            layerCantons,
        ],
        view: new View({
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
}
</script>

<template>
    <OpenlayersMap :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>