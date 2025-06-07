#!/bin/bash

# Script pour basculer entre environnement de production et développement local
# Usage: ./switch-env.sh [prod|dev]

if [ $# -eq 0 ]; then
    echo "Usage: $0 [prod|dev]"
    echo "  prod: Basculer vers l'environnement de production"
    echo "  dev:  Basculer vers l'environnement de développement local"
    exit 1
fi

ENV=$1

if [ "$ENV" = "prod" ]; then
    MODE_PRODUCTION="true"
    echo "🔄 Basculement vers l'environnement de PRODUCTION..."
elif [ "$ENV" = "dev" ]; then
    MODE_PRODUCTION="false"
    echo "🔄 Basculement vers l'environnement de DÉVELOPPEMENT LOCAL..."
else
    echo "❌ Argument invalide. Utilisez 'prod' ou 'dev'"
    exit 1
fi

# Fonction pour modifier un fichier JavaScript
update_js_file() {
    local file=$1
    if [ -f "$file" ]; then
        sed -i.bak "s/const MODE_PRODUCTION = .*/const MODE_PRODUCTION = $MODE_PRODUCTION;/" "$file"
        rm "$file.bak"
        echo "✅ $file mis à jour"
    else
        echo "⚠️  $file non trouvé"
    fi
}

# Mettre à jour les fichiers de configuration
update_js_file "frontend/src/config/api.js"
update_js_file "backend/index.js"
update_js_file "frontend/users.html"

echo ""
if [ "$ENV" = "prod" ]; then
    echo "🚀 Configuration basculée vers la PRODUCTION"
    echo "   - API principale: http://ssssirhcwan.ddns.net:42000"
    echo "   - API mesures: http://ssssirhcwan.ddns.net:40000"
    echo "   - Backend: http://ssssirhcwan.ddns.net:3001"
else
    echo "🛠️  Configuration basculée vers le DÉVELOPPEMENT LOCAL"
    echo "   - API principale: http://localhost:42000"
    echo "   - API mesures: http://localhost:40000"
    echo "   - Backend: http://localhost:3001"
fi
echo ""
echo "🔄 N'oubliez pas de redémarrer vos services si nécessaire !"
