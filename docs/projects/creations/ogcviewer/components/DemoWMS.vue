<script setup>
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import ImageWMS from "ol/source/ImageWMS";
import View from "ol/View";
import {fromLonLat} from "ol/proj";
import OSM from "ol/source/OSM";

const id = "demo-wms";

function wmsSource(layerName) {
    return new ImageWMS({
        url: 'https://webcarto.infogeo54.fr/index.php/lizmap/service',
        params: {
            LAYERS: layerName,
            repository: 'opendata',
            project: 'opendata',
        }
    })
}

function wmsLayer(layerName) {
    return new ImageLayer({
        source: wmsSource(layerName),
        opacity: 1,
    })
}

// Initialiser la carte OpenLayers
function initOpenLayersMap() {
    const map = new Map({
        target: id,
        layers: [
            new TileLayer({
                source: new OSM(),
            }),
            wmsLayer('Limite_du_departement'),
            wmsLayer('Communes'),
            wmsLayer('Colleges'),
        ],
        view: new View({
            center: fromLonLat([6.084, 48.956]), // Meurthe-et-Moselle
            zoom: 8,
        }),
    });
}
</script>

<template>
    <OpenlayersMap :map-id="id" :init-open-layers-map="initOpenLayersMap" />
</template>

<style scoped>

</style>