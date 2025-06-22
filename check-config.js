#!/usr/bin/env node

// Script de vérification de la configuration API
// Usage: node check-config.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification de la configuration des URLs d\'API...\n');

// Liste des fichiers à vérifier
const filesToCheck = [
  {
    path: 'frontend/src/config/api.js',
    type: 'config',
    patterns: ['MODE_PRODUCTION', 'API_CONFIG', 'API_ENDPOINTS']
  },
  {
    path: 'backend/index.js',
    type: 'backend',
    patterns: ['MODE_PRODUCTION', 'BASE_API_URL']
  },
  {
    path: 'frontend/src/views/Dashboard.vue',
    type: 'vue',
    patterns: ['API_CONFIG', 'import.*api.js']
  },
  {
    path: 'frontend/src/views/Login.vue',
    type: 'vue',
    patterns: ['API_ENDPOINTS', 'import.*api.js']
  },
  {
    path: 'frontend/src/App.vue',
    type: 'vue',
    patterns: ['API_ENDPOINTS', 'import.*api.js']
  },
  {
    path: 'frontend/users.html',
    type: 'html',
    patterns: ['MODE_PRODUCTION', 'BASE_URL']
  }
];

let allChecksPass = true;

filesToCheck.forEach(file => {
  const fullPath = path.join(__dirname, file.path);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${file.path} - Fichier non trouvé`);
    allChecksPass = false;
    return;
  }
  
  const content = fs.readFileSync(fullPath, 'utf8');
  let fileChecksPass = true;
  
  file.patterns.forEach(pattern => {
    const regex = new RegExp(pattern, 'i');
    if (!regex.test(content)) {
      console.log(`❌ ${file.path} - Pattern "${pattern}" non trouvé`);
      fileChecksPass = false;
      allChecksPass = false;
    }
  });
  
  if (fileChecksPass) {
    console.log(`✅ ${file.path} - Configuration OK`);
  }
  
  // Vérifications spécifiques par type de fichier
  if (file.type === 'config') {
    // Vérifier que les URLs contiennent bien les domaines attendus
    if (content.includes('ssssirhcwan.ddns.net') && content.includes('localhost')) {
      console.log(`   ✓ Contient les URLs de production et développement`);
    } else {
      console.log(`   ❌ URLs de production ou développement manquantes`);
      allChecksPass = false;
    }
  }
  
  if (file.type === 'backend' || file.type === 'config' || file.type === 'html') {
    // Vérifier la présence de MODE_PRODUCTION
    const modeMatch = content.match(/MODE_PRODUCTION\s*=\s*(true|false)/);
    if (modeMatch) {
      console.log(`   ✓ MODE_PRODUCTION = ${modeMatch[1]}`);
    } else {
      console.log(`   ❌ MODE_PRODUCTION non configuré correctement`);
      allChecksPass = false;
    }
  }
});

console.log('\n' + '='.repeat(50));

if (allChecksPass) {
  console.log('🎉 Toutes les vérifications sont passées !');
  console.log('✅ La configuration des URLs d\'API est correctement mise en place.');
  console.log('\n📝 Pour basculer entre les environnements :');
  console.log('   - Production : ./switch-env.sh prod');
  console.log('   - Développement : ./switch-env.sh dev');
} else {
  console.log('❌ Certaines vérifications ont échoué.');
  console.log('🔧 Veuillez corriger les problèmes avant de continuer.');
  process.exit(1);
}

console.log('\n📚 Consultez README_API_CONFIG.md pour plus d\'informations.');
