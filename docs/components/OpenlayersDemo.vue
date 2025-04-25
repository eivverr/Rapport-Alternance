<script setup>
import OpenlayersMap from "./OpenlayersMap.vue";
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'

const id = "demo-openlayer";

// Initialiser la carte OpenLayers
function initOpenLayersMap() {
    const map = new Map({
        target: id,
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
        ],
        view: new View({
            center: fromLonLat([2.35, 48.85]), // Paris
            zoom: 12,
        }),
    });
}
</script>

<template>
    <OpenlayersMap :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>