<script setup>
import OpenlayersMap from "./OpenlayersMap.vue";

const id = "demo-geojson";

// Initialiser la carte OpenLayers
function initOpenLayersMap() {

    let layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://france-geojson.gregoiredavid.fr/repo/departements/54-meurthe-et-moselle/departement-54-meurthe-et-moselle.geojson',
            format: new ol.format.GeoJSON()
        })
    });

    const map = new ol.Map({
        target: id,
        layers: [
            layer
        ],
        view: new ol.View({
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
    <openlayers-map :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>