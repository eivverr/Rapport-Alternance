# Codes du projet OGCviewer

## Afficher une carte avec des couches de données WMS

::: code-group

```js [map.js]
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
```

```js [wms.js]
function wmsSource(layerName) {
    return new TileWMS({
        url: 'https://webcarto.infogeo54.fr/index.php/lizmap/service',
        params: {
            LAYERS: layerName,
            repository: 'opendata',
            project: 'opendata',
            TILED: true,
            // ...Autres paramètres si besoin
        }
    })
}

export function wmsLayer(layerName) {
    return new TileLayer({
        source: wmsSource(layerName),
        opacity: 1,
    })
}
```

[Retour à la réalisation du projet ↩︎](/projects/creations/ogcviewer/realisation#wms-et-openlayers)