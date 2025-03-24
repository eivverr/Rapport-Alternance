# Réaliser une web application fullstack pour gérer la restauration de sauvegarde de données.

## Faire une api avec Flask

### Définir les routes

```python
# Route d'exemple pour la méthode GET
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': "Hello World !"}), 200
    
# Route d'exemple pour la méthode POST
@app.route('/text', methods=['POST'])
def text():
    data = request.get_json()
    text = data.get('text')
    print(text)
    return jsonify({'message': text}), 200
```

### Executer des commandes shell

### Gérer les erreurs

## Créer une interface web avec Vue.js

### Interoger l'api

### Style de l'interface avec Vuetify

### Afficher les erreurs

## Exemple d'utilisation