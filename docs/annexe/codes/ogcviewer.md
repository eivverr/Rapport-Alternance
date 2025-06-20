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

:::

[Retour à la réalisation du projet ↩︎](/projects/creations/ogcviewer/realisation#wms-et-openlayers)

## Backend Express

::: code-group

```javascript [app.js]
const express = require('express');
const cors = require('cors');
const app = express();

const graphRoutes = require('./routes/graph.routes'); // Importer les routes des graphiques

app.use(cors());
app.use(express.json());

app.use('/api/graphs', graphRoutes); // Utiliser les routes des graphiques

module.exports = app;
```

```javascript [db/db.js]
const Database = require('better-sqlite3');
const path = require('path');
const fs = require("node:fs");

const dataDir = path.resolve(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.resolve(__dirname, '../data/database.db');
const db = new Database(dbPath);

try {
    const sqlFile = fs.readFileSync('db/database.sql', 'utf-8');
    db.exec(sqlFile);
} catch (err) {
    console.error('Erreur lors de l\'exécution du script SQL :', err.message);
}

module.exports = db;
```

```javascript [server.js]
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
```

```javascript [models/graph.js]
const db = require('../db/db'); // Importer la connexion à la base de données
const tableName = 'graphs'; // Nom de la table

exports.getAll = () => {
    const stmt = db.prepare(`SELECT * FROM ${tableName}`);
    return stmt.all();
};
```

```javascript [controllers/graph.controller.js]
const model = require('../models/graph'); // Importer le modèle

exports.getAll = (req, res) => {
    try {
        const graphs = model.getAll();
        res.json(graphs);
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
}
```

```javascript [routes/graph.routes.js]
const express = require('express');
const router = express.Router();
const controller = require('../controllers/graph.controller'); // Importer le contrôleur

router.get('/', controller.getAll); // Route pour récupérer tous les graphiques
```

:::

[Retour à la réalisation du projet ↩︎](/projects/creations/ogcviewer/realisation#faire-un-backend-avec-express)

## Imprimer la carte

```vue
<script setup lang="ts">
import {ref} from 'vue'

const container = ref<HTMLDivElement | null>(null)
const scale = ref(1)
const printableWidth = 1587
const printableHeight = 1123

const containerWidth = container.value.clientWidth
const containerHeight = container.value.clientHeight

const scaleX = containerWidth / printableWidth
const scaleY = containerHeight / printableHeight

scale.value = Math.min(scaleX, scaleY)
</script>

<template>
    <Dialog
        v-model:visible="dialogPdfStore.visible"
        modal
        maximizable
        header="Impression PDF"
        :style="{ width: '60vw' }"
        :contentStyle="{ height: '60vh' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        class="dialog-pdf"
    >
        <div
            ref="container"
            id="printable-page"
            class="relative w-full h-full overflow-hidden bg-stone-400"
        >
            <div
                class="absolute top-0 left-0 origin-top-left p-4"
                :style="{
                width: '1587px',
                height: '1123px',
                transform: `scale(${scale})`,
            }"
            >
                <!-- Contenu d'impression -->
            </div>
        </div>
    </Dialog>
</template>
```

[Retour à la réalisation du projet ↩︎](/projects/creations/ogcviewer/realisation#imprimer-la-carte)