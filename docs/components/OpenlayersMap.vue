<script>
let olLoaded = false;
let olLoadPromise = null;

/**
 * Charge OpenLayers si ce n'est pas déjà fait. <br>
 * Permet d'éviter de charger plusieurs fois OpenLayers et d'avoir des erreurs quand plusieurs maps sont affichées.
 * @returns {Promise<any>|Promise<void>|*} Une promesse résolue lorsque OpenLayers est chargé.
 */
function loadOpenLayers() {
    if (olLoaded) {
        return Promise.resolve();
    }
    if (olLoadPromise) {
        return olLoadPromise;
    }

    olLoadPromise = new Promise((resolve, reject) => {
        // Charger le script OpenLayers (si ce n'est pas déjà fait)
        if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js"]')) {
            let script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js";
            script.onload = () => {
                olLoaded = true;
                console.log("OpenLayers chargé.");
                resolve();
            };
            script.onerror = () => reject(new Error("Erreur de chargement d'OpenLayers."));
            document.head.appendChild(script);
        } else {
            olLoaded = true;
            resolve();
        }

        // Charger le CSS OpenLayers (si ce n'est pas déjà fait)
        if (!document.querySelector('link[href="https://cdn.jsdelivr.net/npm/ol@latest/ol.css"]')) {
            let css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = "https://cdn.jsdelivr.net/npm/ol@latest/ol.css";
            document.head.appendChild(css);
        }
    });

    return olLoadPromise;
}

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
        loadOpenLayers().then(() => {
            this.initOpenLayersMap(this.mapId);
        });
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