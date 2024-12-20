<script setup>
// Charger la bibliothèque OpenLayers
let script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js";
script.onload = function() {
    initOpenLayersMap();
    console.log("OpenLayers chargé.");
};
script.onerror = function() {
    console.error("Erreur de chargement d'OpenLayers.");
};
document.head.appendChild(script);

// Charger le fichier CSS d'OpenLayers
let css = document.createElement("link");
css.rel = "stylesheet";
css.href = "https://cdn.jsdelivr.net/npm/ol@latest/ol.css";
document.head.appendChild(css);

// Initialiser la carte OpenLayers
function initOpenLayersMap() {
    const map = new ol.Map({
        target: "map",
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
    <div id="map"></div>
</template>

<style scoped>
#map {
    width: 100%;
    height: 500px;
}
</style>