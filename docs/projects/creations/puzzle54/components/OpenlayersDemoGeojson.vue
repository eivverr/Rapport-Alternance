<script setup>
import { Map } from "ol";
import { View } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { GeoJSON } from "ol/format";

const id = "demo-geojson";

// Initialiser la carte OpenLayers
function initOpenLayersMap() {

    let layer = new VectorLayer({
        source: new VectorSource({
            url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
            format: new GeoJSON()
        })
    });

    const map = new Map({
        target: id,
        layers: [
            layer
        ],
        view: new View({
            center: [0, 0],
            zoom: 6,
            minZoom: 6,
            maxZoom: 10,
        }),
    });

    let layerSource = layer.getSource();
    layerSource.once('featuresloadend', function() {
        let feature = layerSource.getFeatures()[0];
        map.getView().fit(feature.getGeometry(), {padding: [100, 100, 100, 100]});
    });
}
</script>

<template>
    <OpenlayersMap :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>