<script>
export default {
    props: {
        mapId: {
            type: String,
            required: true
        },
        initOpenLayersMap: {
            type: Function,
            required: true
        }
    },
    mounted() {
        // Vérifie si le script OpenLayers est déjà chargé
        if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js"]')) {
            // Charge le script OpenLayers
            let script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js";
            script.onload = () => {
                // Initialise la carte OpenLayers
                this.initOpenLayersMap();
                console.log("OpenLayers chargé.");
            };
            script.onerror = function() {
                console.error("Erreur de chargement d'OpenLayers.");
            };
            document.head.appendChild(script);
        } else {
            // Initialise la carte OpenLayers
            this.initOpenLayersMap();
        }

        // Vérifie si le fichier CSS OpenLayers est déjà chargé
        if (!document.querySelector('link[href="https://cdn.jsdelivr.net/npm/ol@latest/ol.css"]')) {
            // Charge le fichier CSS OpenLayers
            let css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = "https://cdn.jsdelivr.net/npm/ol@latest/ol.css";
            document.head.appendChild(css);
        }
    }
};
</script>

<template>
    <div :id="mapId" class="map"></div>
</template>

<style scoped>
.map {
    width: 100%;
    height: 500px;
    border: 1px solid gray;
    border-radius: 8px;
    overflow: hidden;
}
</style>