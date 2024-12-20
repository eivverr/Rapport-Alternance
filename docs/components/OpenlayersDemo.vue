<script setup>
import OpenlayersMap from "./OpenlayersMap.vue";

const id = "demo-openlayer";

// Initialiser la carte OpenLayers
function initOpenLayersMap() {
    const map = new ol.Map({
        target: id,
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([2.35, 48.85]), // Paris
            zoom: 12,
        }),
    });
}
</script>

<template>
    <openlayers-map :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>