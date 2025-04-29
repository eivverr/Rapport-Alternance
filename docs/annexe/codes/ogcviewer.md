# Codes du projet OGCviewer

## Afficher une carte avec des couches de données WMS

::: code-group

```typescript [map.ts]
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { wmsLayer } from './wms'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'

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

```typescript [wms.ts]
import TileWMS from 'ol/source/TileWMS'
import TileLayer from 'ol/layer/Tile'

function wmsSource(layerName: string): TileWMS {
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

export function wmsLayer(layerName: string): TileLayer {
    return new TileLayer({
        source: wmsSource(layerName),
        opacity: 1,
    })
}
```

[Retour à la réalisation du projet ↩︎](/projects/creations/ogcviewer/realisation#wms-et-openlayers)