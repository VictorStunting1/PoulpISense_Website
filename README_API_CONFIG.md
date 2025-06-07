# Configuration des URLs d'API - PoulpISense

## Vue d'ensemble

Ce projet utilise désormais une configuration centralisée pour toutes les URLs d'API, permettant de basculer facilement entre l'environnement de production et l'environnement de développement local.

## Configuration

### Frontend

Le fichier `frontend/src/config/api.js` contient la configuration centralisée :

```javascript
const MODE_PRODUCTION = true; // Changez à false pour le développement local

export const API_CONFIG = {
  BASE_URL: MODE_PRODUCTION ? 'http://ssssirhcwan.ddns.net:42000' : 'http://localhost:42000',
  MEASUREMENTS_URL: MODE_PRODUCTION ? 'http://ssssirhcwan.ddns.net:40000' : 'http://localhost:40000',
  BACKEND_URL: MODE_PRODUCTION ? 'http://ssssirhcwan.ddns.net:3001' : 'http://localhost:3001'
};
```

### Backend

Le fichier `backend/index.js` contient également une configuration similaire :

```javascript
const MODE_PRODUCTION = true; // Changez à false pour le développement local

const BASE_API_URL = MODE_PRODUCTION 
  ? "http://ssssirhcwan.ddns.net:40000"
  : "http://localhost:40000";
```

## Comment basculer entre les environnements

### Pour le développement local :

1. **Frontend** : Dans `frontend/src/config/api.js`, changez :
   ```javascript
   const MODE_PRODUCTION = false;
   ```

2. **Backend** : Dans `backend/index.js`, changez :
   ```javascript
   const MODE_PRODUCTION = false;
   ```

3. **HTML statique** : Dans `frontend/users.html`, changez :
   ```javascript
   const MODE_PRODUCTION = false;
   ```

### Pour la production :

Assurez-vous que tous les fichiers ont :
```javascript
const MODE_PRODUCTION = true;
```

## Fichiers modifiés

Les fichiers suivants ont été modifiés pour utiliser la configuration centralisée :

### Frontend :
- `src/config/api.js` (nouveau fichier de configuration)
- `src/views/Dashboard.vue`
- `src/views/Login.vue`
- `src/views/Dashboard_old.vue`
- `src/App.vue`
- `users.html`

### Backend :
- `index.js`

## Endpoints disponibles

Le fichier de configuration expose également des raccourcis pour les endpoints les plus courants :

```javascript
export const API_ENDPOINTS = {
  DEVICES: `${API_CONFIG.BASE_URL}/api/devices`,
  USERS: `${API_CONFIG.BASE_URL}/api/users`,
  USERS_PASSWORD: `${API_CONFIG.BASE_URL}/api/users_password`,
  MEASUREMENTS: `${API_CONFIG.MEASUREMENTS_URL}/measurements`,
  API_MEASUREMENTS: `${API_CONFIG.BASE_URL}/api/measurements`
};
```

## Utilisation dans le code

### Importer la configuration :
```javascript
import { API_CONFIG, API_ENDPOINTS } from '../config/api.js'
```

### Utiliser les endpoints :
```javascript
// Au lieu de :
axios.get('http://ssssirhcwan.ddns.net:42000/api/devices')

// Utilisez :
axios.get(API_ENDPOINTS.DEVICES)
// ou
axios.get(`${API_CONFIG.BASE_URL}/api/devices`)
```

## Avantages

1. **Basculement facile** : Un seul endroit pour changer l'environnement
2. **Maintenance simplifiée** : Toutes les URLs sont centralisées
3. **Réduction des erreurs** : Moins de risques d'oublier de changer une URL
4. **Meilleure lisibilité** : Le code est plus propre avec des constantes nommées
