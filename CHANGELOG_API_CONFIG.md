# Changelog - Configuration des URLs d'API

## Résumé des modifications

Cette mise à jour centralise la configuration des URLs d'API pour faciliter le basculement entre l'environnement de production et l'environnement de développement local.

## 🆕 Nouveaux fichiers créés

### Configuration
- `frontend/src/config/api.js` - Fichier de configuration centralisé des URLs d'API
- `README_API_CONFIG.md` - Documentation complète de la configuration
- `switch-env.sh` - Script pour basculer facilement entre les environnements
- `check-config.js` - Script de vérification de la configuration

## ✏️ Fichiers modifiés

### Backend
- `backend/index.js` - Ajout de la variable `MODE_PRODUCTION` pour contrôler l'environnement

### Frontend - Composants Vue
- `frontend/src/views/Dashboard.vue` - Import et utilisation de `API_CONFIG`
- `frontend/src/views/Login.vue` - Import et utilisation de `API_ENDPOINTS.USERS_PASSWORD`
- `frontend/src/views/Dashboard_old.vue` - Import et utilisation de `API_ENDPOINTS`
- `frontend/src/App.vue` - Import et utilisation de `API_ENDPOINTS.DEVICES`

### Frontend - Fichiers HTML
- `frontend/users.html` - Ajout de la configuration `MODE_PRODUCTION`

## 🔧 Fonctionnalités ajoutées

### Configuration centralisée
```javascript
const MODE_PRODUCTION = true; // Point de contrôle unique

export const API_CONFIG = {
  BASE_URL: MODE_PRODUCTION ? 'http://ssssirhcwan.ddns.net:42000' : 'http://localhost:42000',
  MEASUREMENTS_URL: MODE_PRODUCTION ? 'http://ssssirhcwan.ddns.net:40000' : 'http://localhost:40000',
  BACKEND_URL: MODE_PRODUCTION ? 'http://ssssirhcwan.ddns.net:3001' : 'http://localhost:3001'
};
```

### Endpoints prédéfinis
```javascript
export const API_ENDPOINTS = {
  DEVICES: `${API_CONFIG.BASE_URL}/api/devices`,
  USERS: `${API_CONFIG.BASE_URL}/api/users`,
  USERS_PASSWORD: `${API_CONFIG.BASE_URL}/api/users_password`,
  MEASUREMENTS: `${API_CONFIG.MEASUREMENTS_URL}/measurements`,
  API_MEASUREMENTS: `${API_CONFIG.BASE_URL}/api/measurements`
};
```

### Scripts utilitaires
- **Basculement d'environnement** : `./switch-env.sh [prod|dev]`
- **Vérification de configuration** : `node check-config.js`

## 📈 Avantages

1. **Maintenance simplifiée** : Un seul endroit pour changer toutes les URLs
2. **Basculement facile** : Un seul paramètre à modifier pour changer d'environnement
3. **Réduction des erreurs** : Moins de risques d'oublier de modifier une URL
4. **Meilleure lisibilité** : Code plus propre avec des constantes nommées
5. **Outils d'aide** : Scripts pour automatiser les tâches communes

## 🚀 Utilisation

### Pour basculer en mode développement local :
```bash
./switch-env.sh dev
```

### Pour basculer en mode production :
```bash
./switch-env.sh prod
```

### Pour vérifier la configuration :
```bash
node check-config.js
```

## 🔄 Migration des URLs existantes

| Ancien                                    | Nouveau                           |
|-------------------------------------------|-----------------------------------|
| `http://ssssirhcwan.ddns.net:42000`     | `API_CONFIG.BASE_URL`            |
| `http://ssssirhcwan.ddns.net:40000`     | `API_CONFIG.MEASUREMENTS_URL`    |
| `/api/devices`                           | `API_ENDPOINTS.DEVICES`          |
| `/api/users_password`                    | `API_ENDPOINTS.USERS_PASSWORD`   |

## ⚠️ Notes importantes

- **Redémarrage requis** : Après avoir changé l'environnement, redémarrez vos services
- **Synchronisation** : Assurez-vous que tous les fichiers utilisent la même valeur de `MODE_PRODUCTION`
- **Tests** : Testez les fonctionnalités après chaque basculement d'environnement

## 🐛 Résolution de problèmes

Si vous rencontrez des problèmes :

1. Vérifiez la configuration : `node check-config.js`
2. Assurez-vous que `MODE_PRODUCTION` est cohérent dans tous les fichiers
3. Redémarrez les services frontend et backend
4. Consultez `README_API_CONFIG.md` pour plus de détails

---

**Date de mise à jour** : 7 juin 2025  
**Version** : 1.0.0
