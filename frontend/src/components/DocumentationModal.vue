<template>
  <div v-if="isVisible" class="documentation-modal-overlay" @click="closeModal">
    <div class="documentation-modal" @click.stop>
      <div class="modal-header">
        <div class="modal-title">
          <i class="fas fa-book"></i>
          <h2>Documentation Dashboard</h2>
        </div>
        <button @click="closeModal" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="modal-content" ref="contentContainer">
        <div class="markdown-content" v-html="compiledMarkdown"></div>
      </div>
      
      <div class="modal-footer">
        <button @click="closeModal" class="footer-btn">
          <i class="fas fa-check"></i>
          Compris
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const contentContainer = ref(null)
const markdownContent = ref('')

// Configuration de marked pour un meilleur rendu
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: 'doc-'
})

const compiledMarkdown = computed(() => {
  if (!markdownContent.value) return ''
  return marked(markdownContent.value)
})

const closeModal = () => {
  emit('close')
}

// Charger le contenu markdown
onMounted(async () => {
  try {
    const response = await fetch('/src/assets/dashboard-documentation.md')
    if (response.ok) {
      markdownContent.value = await response.text()
    } else {
      // Fallback si le fichier n'est pas trouvé
      markdownContent.value = `
# 📊 Guide Utilisateur - Dashboard PoulpISense

## 🎯 Vue d'ensemble

Le Dashboard PoulpISense est votre centre de contrôle principal pour surveiller et analyser les données de vos appareils de mesure de qualité de l'eau en temps réel.

## 🚀 Fonctionnalités principales

### 📱 Sélection d'appareils
- Cliquez sur une carte d'appareil pour le sélectionner
- Visualisez le statut de connexion (vert = en ligne, rouge = hors ligne)
- Consultez les informations détaillées de chaque appareil

### 📊 Métriques en temps réel
- **Température** : Surveillance continue avec seuils optimaux
- **pH** : Contrôle de l'acidité/basicité de l'eau
- **Turbidité** : Mesure de la clarté de l'eau

### 📈 Graphiques interactifs
- Choisissez la période d'affichage (24h, 7j, 30j)
- Graphiques interactifs avec zoom et filtrage
- Export des données en PDF ou CSV

### 🔍 Recherche et tri
- Recherche dans toutes les mesures
- Tri par date, heure, ou valeurs
- Pagination intelligente des résultats

### 🌙 Mode sombre
- Interface adaptée pour un confort visuel optimal
- Commutation automatique selon vos préférences

## 📞 Support
Pour toute assistance : support@poulpisense.com
      `
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la documentation:', error)
    markdownContent.value = '# Documentation non disponible\n\nUne erreur est survenue lors du chargement de la documentation.'
  }
})

// Gérer l'échappement pour fermer le modal
onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === 'Escape' && props.isVisible) {
      closeModal()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  return () => {
    document.removeEventListener('keydown', handleEscape)
  }
})
</script>

<style scoped>
.documentation-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.documentation-modal {
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal-title h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
}

.modal-title i {
  font-size: 1.5rem;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.modal-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

.markdown-content {
  padding: 2rem;
  line-height: 1.7;
  color: #2d3748;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Styles pour le contenu Markdown */
.markdown-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.markdown-content :deep(h2) {
  font-size: 2rem;
  font-weight: 700;
  margin: 2.5rem 0 1.5rem;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.75rem;
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
  color: #4a5568;
}

.markdown-content :deep(h4) {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  color: #667eea;
}

.markdown-content :deep(p) {
  margin: 1rem 0;
  color: #4a5568;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin: 0.5rem 0;
  color: #4a5568;
}

.markdown-content :deep(code) {
  background: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.875rem;
  color: #667eea;
}

.markdown-content :deep(pre) {
  background: #1a202c;
  border-radius: 12px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content :deep(pre code) {
  background: none;
  border: none;
  padding: 0;
  color: #f7fafc;
  font-size: 0.9rem;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #667eea;
  background: rgba(102, 126, 234, 0.05);
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
}

.markdown-content :deep(blockquote p) {
  margin: 0;
  color: #667eea;
  font-style: italic;
}

.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

.markdown-content :deep(th) {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.markdown-content :deep(td) {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
}

.markdown-content :deep(tr:hover) {
  background: #f7fafc;
}

.markdown-content :deep(hr) {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
  margin: 3rem 0;
}

.markdown-content :deep(strong) {
  color: #667eea; /* Couleur de votre thème */
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* Ombre légère pour plus de définition */
}

.markdown-content :deep(em) {
  color: #667eea;
  font-style: italic;
}

/* Styles spéciaux pour les émojis et icônes */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  justify-content: flex-end;
}

.footer-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.footer-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .documentation-modal {
    background: #1a202c;
    color: #f7fafc;
  }
  
  .modal-header {
    border-bottom-color: #4a5568;
  }
  
  .modal-footer {
    background: #2d3748;
    border-top-color: #4a5568;
  }
  
  .markdown-content {
    color: #f7fafc;
  }
  
  .markdown-content :deep(h2) {
    color: #f7fafc;
    border-bottom-color: #4a5568;
  }
  
  .markdown-content :deep(h3) {
    color: #e2e8f0;
  }
  
  .markdown-content :deep(p),
  .markdown-content :deep(li) {
    color: #cbd5e0;
  }
  
  .markdown-content :deep(code) {
    background: #2d3748;
    border-color: #4a5568;
  }
  
  .markdown-content :deep(td) {
    border-bottom-color: #4a5568;
    color: #cbd5e0;
  }
  
  .markdown-content :deep(tr:hover) {
    background: #2d3748;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .documentation-modal-overlay {
    padding: 1rem;
  }
  
  .documentation-modal {
    max-height: 90vh;
  }
  
  .modal-header {
    padding: 1.5rem 1rem 1rem;
  }
  
  .modal-title h2 {
    font-size: 1.5rem;
  }
  
  .markdown-content {
    padding: 1.5rem;
  }
  
  .markdown-content :deep(h1) {
    font-size: 2rem;
  }
  
  .markdown-content :deep(h2) {
    font-size: 1.75rem;
  }
  
  .modal-footer {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .modal-header {
    padding: 1rem;
  }
  
  .modal-title {
    gap: 0.5rem;
  }
  
  .modal-title h2 {
    font-size: 1.25rem;
  }
  
  .markdown-content {
    padding: 1rem;
  }
  
  .close-btn {
    width: 36px;
    height: 36px;
  }
}
</style>