// Configuration des URLs d'API
// Changez MODE_PRODUCTION à false pour utiliser le serveur local

const MODE_PRODUCTION = false; // Set to true for production

export const API_CONFIG = {
  // URL du serveur principal (port 42000)
  BASE_URL: MODE_PRODUCTION 
    ? 'http://ssssirhcwan.ddns.net:42000' 
    : 'http://localhost:3001',
    
  // URL du serveur de mesures (port 40000)
  MEASUREMENTS_URL: MODE_PRODUCTION 
    ? 'http://ssssirhcwan.ddns.net:40000' 
    : 'http://localhost:3001',
    
  // URL du backend local (port 3001)
  BACKEND_URL: MODE_PRODUCTION 
    ? 'http://ssssirhcwan.ddns.net:3001' 
    : 'http://localhost:3001'
};

// Raccourcis pour les endpoints les plus courants
export const API_ENDPOINTS = {
  DEVICES: `${API_CONFIG.BASE_URL}/api/devices`,
  USERS: `${API_CONFIG.BASE_URL}/api/users`,
  USERS_PASSWORD: `${API_CONFIG.BASE_URL}/api/users_password`,
  MEASUREMENTS: `${API_CONFIG.MEASUREMENTS_URL}/measurements`,
  API_MEASUREMENTS: `${API_CONFIG.BASE_URL}/api/measurements`
};
