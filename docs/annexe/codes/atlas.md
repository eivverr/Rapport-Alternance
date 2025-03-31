# Codes du projet Atlas

## Actualisation du tableau et décoche les autres checkbox

```js
lizMap.events.on({
    'uicreated': function (evt) {

        // Ouvre le panneau des statistiques
        $('#button-dataviz').click()

        // Ouvre le panneau des données attributaires
        $("#button-attributeLayers").click();

        // Récupère les checkboxs des couches
        const checkboxsLayers = $('.checkbox');

        // Récupère les noms des couches des données attributaires
        const layersDataName = $('button.btn-open-attribute-layer').map(function () {
            return $(this).val();
        }).get();

        /**
         * Fonction pour fermer un panneau des données attributaires
         * @param layerName Nom de la couche
         */
        function closePanel(layerName) {
            let id = `#nav-tab-attribute-layer-${layerName}`;
            if ($(id).length === 0) return;

            // Ferme le panneau des données attributaires
            $(id)[0].firstChild.lastChild.click();
        }

        /**
         * Fonction pour fermer tous les panneaux des données attributaires
         */
        function closeAllPanels() {
            for (let j = 0; j < layersDataName.length; j++) {
                closePanel(layersDataName[j]);
            }
        }

        /**
         * Fonction pour cacher le bouton de fermeture du panneau des données attributaires
         * @param layerName Nom de la couche
         */
        function hideCloseButton(layerName) {
            let id = `#nav-tab-attribute-layer-${layerName}`;
            if ($(id).length === 0) return;

            // Cache le bouton de fermeture du panneau des données attributaires
            let closeButton = $(id)[0].firstChild.lastChild;
            closeButton.style.width = "0";
            closeButton.style.height = "0";
        }

        /**
         * Fonction pour ouvrir un panneau des données attributaires
         * @param checkboxValue Valeur de la checkbox
         */
        function openPanel(checkboxValue) {
            for (let j = 0; j < layersDataName.length; j++) {
                if (layersDataName[j] === checkboxValue) {

                    // Clique sur le bouton pour afficher les données
                    $('button.btn-open-attribute-layer')[j].click();

                    hideCloseButton(checkboxValue);
                }
            }
        }

        /**
         * Fonction pour décocher toutes les autres checkboxs des couches
         * Ne décoche que les couches des données attributaires
         * @param checkboxValue Valeur de la checkbox
         */
        function uncheckAllOthers(checkboxValue) {
            for (let i = 0; i < checkboxsLayers.length; i++) {
                if (checkboxsLayers[i].value !== checkboxValue
                    && checkboxsLayers[i].classList.contains('checked')
                    && layersDataName.includes(checkboxsLayers[i].value)
                ) {
                    // console.log("---" + checkboxsLayers[i].value + "---");
                    // console.log(checkboxsLayers[i].classList);

                    // checkboxsLayers[i].removeEventListener('click', checkboxClick);
                    checkboxsLayers[i].click();
                    // checkboxsLayers[i].addEventListener('click', checkboxClick);
                }
            }
        }

        /**
         * Fonction pour gérer l'ouverture et la fermeture des panneaux des données attributaires
         */
        function checkboxClick() {
            if (this.classList.contains('checked')) {
                uncheckAllOthers(this.value);
                closeAllPanels();
                openPanel(this.value);
            } else {
                closePanel(this.value);
            }
        }

        // Au chargement de la page, ouvre les panneaux des couches cochées
        for (let i = 0; i < checkboxsLayers.length; i++) {
            if (checkboxsLayers[i].classList.contains('checked')) {
                openPanel(checkboxsLayers[i].value);
            }
        }

        // Gère l'ouverture et la fermeture des panneaux des données attributaires
        for (let i = 0; i < checkboxsLayers.length; i++) {
            checkboxsLayers[i].addEventListener('click', checkboxClick);
        }
    }
});
```