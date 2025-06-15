# 📊 Guide Utilisateur - Dashboard PoulpISense

## 🎯 Vue d'ensemble

Le Dashboard PoulpISense est votre centre de contrôle principal pour surveiller et analyser les données de vos appareils de mesure de qualité de l'eau en temps réel.

---

## 🚀 Démarrage rapide

### 1. Sélection d'un appareil
- Dans la section **"Vos Appareils Connectés"**, cliquez sur l'une des cartes d'appareil disponibles
- L'appareil sélectionné sera mis en surbrillance avec une bordure bleue
- Les données de l'appareil s'afficheront automatiquement

> **💡 Astuce :** Un indicateur coloré (vert/rouge) montre le statut en ligne de chaque appareil.

---

## 📈 Sections principales

### 🏷️ Informations de l'appareil
Une fois un appareil sélectionné, vous verrez :
- **Nom et description** de l'appareil
- **Localisation** d'installation
- **Date d'installation**
- **Statut de connexion** (En ligne/Hors ligne)

### 📊 Métriques en temps réel
Trois cartes principales affichent les dernières mesures :

#### 🌡️ Température
- **Valeur actuelle** en degrés Celsius
- **Plage optimale :** 20-25°C
- **Indicateur de tendance** (↑ hausse, ↓ baisse, → stable)
- **Mini-graphique** d'évolution

#### ⚗️ pH (Potentiel Hydrogène)
- **Valeur actuelle** du pH
- **Plage optimale :** 6.5-8.5
- **Indicateur de tendance**
- **Mini-graphique** d'évolution

#### 💧 Turbidité
- **Valeur actuelle** en NTU (Unité de Turbidité Néphélométrique)
- **Valeur optimale :** < 4 NTU
- **Indicateur de tendance**
- **Mini-graphique** d'évolution

---

## 📈 Graphique d'historique

### Contrôles de période
Sélectionnez la période d'affichage :
- **24h** : Dernières 24 heures (affichage par heure)
- **7j** : Dernière semaine (affichage par jour)
- **30j** : Dernier mois (affichage par jour)

### Fonctionnalités du graphique
- **Zoom interactif** : Cliquez et glissez pour zoomer
- **Légende interactive** : Cliquez sur une légende pour masquer/afficher une courbe
- **Tooltip détaillé** : Survolez les points pour voir les valeurs exactes

---

## 📋 Tableau des mesures

### 🔍 Recherche et filtrage
- **Barre de recherche** : Tapez pour filtrer par date, heure, ou valeur
- **Indicateur de filtre** : S'affiche quand une recherche est active
- **Bouton d'effacement** : Supprime rapidement le filtre actuel

### 📊 Système de tri
Cliquez sur le bouton **"Trier"** pour accéder aux options :

#### Tri par date/heure
- **Plus récent** : Tri décroissant par date
- **Plus ancien** : Tri croissant par date
- **Heure ↓/↑** : Tri par heure décroissant/croissant

#### Tri par valeurs
- **Température ↓/↑** : Du plus chaud au plus froid (ou inverse)
- **pH ↓/↑** : Du plus basique au plus acide (ou inverse)
- **Turbidité ↓/↑** : Du plus trouble au plus clair (ou inverse)

### 🎨 Codes couleur des valeurs

#### Température
- 🔵 **Bleu** : Froid (< 15°C)
- 🟢 **Vert** : Normal (15-25°C)
- 🔴 **Rouge** : Chaud (> 25°C)

#### pH
- 🟠 **Orange** : Acide (< 6.5)
- 🟢 **Vert** : Optimal (6.5-8.5)
- 🟣 **Violet** : Basique (> 8.5)

#### Turbidité
- 🟢 **Vert** : Faible (< 1 NTU) - Excellent
- 🟠 **Orange** : Moyenne (1-4 NTU) - Acceptable
- 🔴 **Rouge** : Élevée (> 4 NTU) - Problématique

### 📄 Pagination
- **Navigation** : Utilisez les flèches ← → pour naviguer entre les pages
- **Saut de page** : Cliquez directement sur un numéro de page
- **Informations** : Affichage du nombre d'éléments et de la page actuelle

---

## 📤 Export des données

### 📑 Export PDF
- **Contenu** : Rapport complet avec en-tête, période, et tableau des données
- **Format** : Document PDF prêt à imprimer
- **Nom de fichier** : `mesures_[appareil]_[date].pdf`

### 📊 Export CSV
- **Contenu** : Données brutes exportables vers Excel
- **Séparateur** : Point-virgule (;) pour compatibilité française
- **Colonnes** : Date, Heure, Température, pH, Turbidité, Appareil, Localisation
- **Nom de fichier** : `mesures_[appareil]_[date].csv`

> **📝 Note :** Les exports incluent uniquement les données de la période sélectionnée.

---

## 🌙 Mode sombre

### Activation
- Cliquez sur l'icône **🌙** dans la barre de navigation
- Le thème s'adapte automatiquement à toute l'interface
- Préférence sauvegardée pour vos prochaines visites

### Avantages
- **Confort visuel** réduit la fatigue oculaire
- **Économie d'énergie** sur écrans OLED
- **Lisibilité améliorée** dans environnements sombres

---

## 📱 Compatibilité mobile

### Fonctionnalités adaptatives
- **Design responsive** : Interface optimisée pour tous les écrans
- **Navigation tactile** : Gestes naturels sur mobile et tablette
- **Performance** : Chargement rapide même sur connexions lentes

### Contrôles mobiles
- **Pincer pour zoomer** sur les graphiques
- **Balayage** pour naviguer dans le tableau
- **Menu hamburger** pour navigation compacte

---

## ⚡ Raccourcis clavier

| Raccourci | Action |
|-----------|--------|
| `Espace` | Actualiser les données |
| `1`, `2`, `3` | Sélectionner période (24h, 7j, 30j) |
| `Ctrl/Cmd + F` | Focus sur la recherche |
| `Échap` | Fermer les menus ouverts |
| `←` `→` | Navigation pagination |

---

## 🔧 Résolution de problèmes

### Aucun appareil affiché
1. **Vérifiez votre connexion** internet
2. **Actualisez la page** (F5)
3. **Contactez l'administrateur** si le problème persiste

### Données manquantes
1. **Vérifiez la période** sélectionnée
2. **Essayez une autre période** (7j ou 30j)
3. **Vérifiez que l'appareil** est en ligne

### Performance lente
1. **Réduisez la période** d'affichage (24h au lieu de 30j)
2. **Fermez les autres onglets** du navigateur
3. **Videz le cache** du navigateur

### Problèmes d'export
1. **Vérifiez les autorisations** de téléchargement
2. **Assurez-vous d'avoir des données** dans la période
3. **Essayez l'autre format** (PDF/CSV)

---

## 📞 Support

### Assistance technique
- **Email** : support@poulpisense.com
- **Téléphone** : +33 (0)1 XX XX XX XX
- **Horaires** : Lun-Ven 9h-18h

### Ressources
- **Base de connaissances** : [help.poulpisense.com](https://help.poulpisense.com)
- **Vidéos tutoriels** : [youtube.com/poulpisense](https://youtube.com/poulpisense)
- **Forum communauté** : [community.poulpisense.com](https://community.poulpisense.com)

---

## 🔄 Mises à jour

Le Dashboard est régulièrement mis à jour avec de nouvelles fonctionnalités :
- **Notifications automatiques** des mises à jour importantes
- **Nouvelles fonctionnalités** ajoutées mensuellement
- **Corrections de bugs** déployées en continu

---

**💡 Conseil :** Cette documentation est également accessible via le bouton "?" dans l'interface pour une consultation rapide pendant l'utilisation.

*Dernière mise à jour : 15 juin 2025*
