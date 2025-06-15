<template>
  <div v-if="isVisible" class="documentation-modal-overlay" @click="!isFullscreen ? closeModal() : null">
    <div class="documentation-modal" :class="{ 'fullscreen': isFullscreen }" @click.stop>
      <div class="modal-header" v-show="!isFullscreen">
        <div class="modal-title">
          <i class="fas fa-book"></i>
          <h2>Documentation Dashboard</h2>
        </div>
        <div class="header-actions">
          <button @click="toggleFullscreen" class="fullscreen-btn" :title="isFullscreen ? 'Quitter le mode lecture' : 'Mode lecture immersif'">
            <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
          </button>
          <button @click="downloadDocumentation" class="download-btn" title="Télécharger la documentation">
            <i class="fas fa-download"></i>
          </button>
          <button @click="closeModal" class="close-btn" title="Fermer">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="modal-content" ref="contentContainer">
        <div class="markdown-content" v-html="compiledMarkdown"></div>
        
        <!-- Boutons flottants en mode plein écran -->
        <div v-if="isFullscreen" class="fullscreen-controls">
          <button @click="toggleFullscreen" class="floating-btn exit-btn" title="Quitter le mode lecture">
            <i class="fas fa-compress"></i>
          </button>
          <button @click="downloadDocumentation" class="floating-btn download-floating-btn" title="Télécharger">
            <i class="fas fa-download"></i>
          </button>
          <button @click="closeModal" class="floating-btn close-floating-btn" title="Fermer la documentation">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      <div class="modal-footer" v-show="!isFullscreen">
        <div class="footer-left">
          <span class="keyboard-hint">
            <strong>Échap</strong> pour fermer
          </span>
        </div>
        <div class="footer-right">
          <button @click="downloadDocumentation" class="download-footer-btn">
            <i class="fas fa-download"></i>
            Télécharger
          </button>
          <button @click="closeModal" class="footer-btn">
            <i class="fas fa-check"></i>
            Compris
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
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
const isFullscreen = ref(false)

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
  isFullscreen.value = false // Réinitialiser le mode plein écran
  emit('close')
}

// Fonction pour basculer le mode plein écran
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

// Fonction pour télécharger la documentation
const downloadDocumentation = () => {
  const element = document.createElement('a')
  const file = new Blob([markdownContent.value], { type: 'text/markdown' })
  element.href = URL.createObjectURL(file)
  element.download = 'Dashboard-PoulpISense-Documentation.md'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
  URL.revokeObjectURL(element.href)
}

// Gérer le verrouillage du scroll de la page en arrière-plan
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    // Bloquer le scroll de la page
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
  } else {
    // Restaurer le scroll de la page
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }
}, { immediate: true })

// Charger le contenu markdown
onMounted(async () => {
  try {
    // MODIFIER CETTE LIGNE - utiliser le chemin depuis public
    const response = await fetch('/dashboard-documentation.md')
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

// Gérer l'échappement pour fermer le modal et F11 pour le plein écran
onMounted(() => {
  const handleKeydown = (event) => {
    if (!props.isVisible) return
    
    if (event.key === 'Escape') {
      if (isFullscreen.value) {
        isFullscreen.value = false // Sortir du plein écran d'abord
      } else {
        closeModal() // Puis fermer le modal
      }
    } else if (event.key === 'F11') {
      event.preventDefault() // Empêcher le plein écran natif du navigateur
      toggleFullscreen()
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  return () => {
    document.removeEventListener('keydown', handleKeydown)
  }
})

// Nettoyer le style overflow quand le composant est démonté
onMounted(() => {
  return () => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
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
  transition: all 0.4s ease;
}

/* Overlay en mode plein écran - plus discret */
.documentation-modal-overlay:has(.documentation-modal.fullscreen) {
  background: transparent;
  backdrop-filter: none;
  padding: 0;
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mode plein écran - lecture immersive */
.documentation-modal.fullscreen {
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10001;
  background: #fafafa;
}

/* Mode sombre pour le plein écran */
@media (prefers-color-scheme: dark) {
  .documentation-modal.fullscreen {
    background: #0f172a;
  }
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
  /* Empêcher le scroll de la page en arrière-plan */
  overscroll-behavior: contain;
}

/* Contenu en mode plein écran - lecture immersive */
.documentation-modal.fullscreen .modal-content {
  height: 100vh;
  overflow-y: auto;
  position: relative;
}

.documentation-modal.fullscreen .markdown-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 3rem;
  font-size: 1.125rem;
  line-height: 1.8;
  background: transparent;
}

/* Styles optimisés pour la lecture */
.documentation-modal.fullscreen .markdown-content :deep(h1) {
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
}

.documentation-modal.fullscreen .markdown-content :deep(h2) {
  font-size: 2.25rem;
  margin: 4rem 0 2rem;
}

.documentation-modal.fullscreen .markdown-content :deep(h3) {
  font-size: 1.75rem;
  margin: 3rem 0 1.5rem;
}

.documentation-modal.fullscreen .markdown-content :deep(p) {
  margin: 1.5rem 0;
  font-size: 1.125rem;
  line-height: 1.8;
}

.documentation-modal.fullscreen .markdown-content :deep(ul),
.documentation-modal.fullscreen .markdown-content :deep(ol) {
  margin: 2rem 0;
  font-size: 1.125rem;
  line-height: 1.8;
}

.documentation-modal.fullscreen .markdown-content :deep(li) {
  margin: 1rem 0;
}

.markdown-content {
  padding: 2rem;
  line-height: 1.7;
  color: #2d3748;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Actions du header */
.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.download-btn {
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
  font-size: 1.125rem;
}

.download-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

/* Bouton plein écran */
.fullscreen-btn {
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
  font-size: 1.125rem;
}

.fullscreen-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

/* Contrôles flottants en mode plein écran */
.fullscreen-controls {
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 10002;
}

.floating-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  opacity: 0.8;
}

.floating-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.exit-btn {
  background: rgba(59, 130, 246, 0.9);
  color: white;
}

.exit-btn:hover {
  background: rgba(37, 99, 235, 1);
  box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
}

.download-floating-btn {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}

.download-floating-btn:hover {
  background: rgba(5, 150, 105, 1);
  box-shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
}

.close-floating-btn {
  background: rgba(239, 68, 68, 0.9);
  color: white;
}

.close-floating-btn:hover {
  background: rgba(220, 38, 38, 1);
  box-shadow: 0 6px 25px rgba(239, 68, 68, 0.4);
}

/* Bouton de téléchargement dans le footer */
.download-footer-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(16, 185, 129, 0.9);
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 1rem;
}

.download-footer-btn:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

/* Améliorer le footer pour deux boutons */
.modal-footer {
  padding: 1.5rem 2rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-left {
  flex: 1;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.keyboard-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.keyboard-hint i {
  color: #667eea;
}

.keyboard-hint strong {
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.75rem;
  color: #334155;
}

/* Améliorer le texte en gras pour plus de lisibilité */
.markdown-content :deep(strong) {
  color: #1e3a8a; /* Bleu très foncé pour excellent contraste */
  font-weight: 700;
  background: rgba(59, 130, 246, 0.1); /* Arrière-plan bleu très léger */
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  border-left: 3px solid #3b82f6; /* Bordure gauche pour plus de visibilité */
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
  color: #1e3a8a; /* Bleu très foncé pour excellent contraste */
  font-weight: 700;
  background: rgba(59, 130, 246, 0.1); /* Arrière-plan bleu très léger */
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  border-left: 3px solid #3b82f6; /* Bordure gauche pour plus de visibilité */
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
  align-items: center;
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
    color: #e2e8f0 !important; /* Texte plus clair */
  }
  
  .download-footer-btn {
    background: rgba(16, 185, 129, 0.8);
  }
  
  .download-footer-btn:hover {
    background: #10b981;
  }
  
  .markdown-content :deep(strong) {
    color: #93c5fd; /* Bleu clair pour mode sombre */
    background: rgba(59, 130, 246, 0.2);
    border-left-color: #60a5fa;
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
  
  .header-actions {
    gap: 0.5rem;
  }
  
  .fullscreen-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .download-btn {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .download-footer-btn {
    padding: 0.65rem 1.25rem;
    margin-right: 0.75rem;
  }
  
  .fullscreen-controls {
    top: 1rem;
    right: 1rem;
    gap: 0.75rem;
  }
  
  .floating-btn {
    width: 48px;
    height: 48px;
    font-size: 1.125rem;
  }
  
  .documentation-modal.fullscreen .markdown-content {
    padding: 2rem 1.5rem;
    font-size: 1rem;
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
  
  .modal-footer {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .download-footer-btn {
    margin-right: 0;
    width: 100%;
    justify-content: center;
  }
  
  .footer-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>