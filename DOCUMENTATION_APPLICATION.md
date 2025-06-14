# 🐙 PoulpISence - Application IoT de Surveillance de Capteurs

## 📋 Vue d'Ensemble

**PoulpISence** est une application mobile IoT développée avec .NET MAUI 9.0 qui permet la surveillance et la gestion de capteurs environnementaux en temps réel. L'application offre une interface moderne et intuitive pour collecter, analyser et visualiser les données de capteurs dans différents environnements.

### 🎯 Objectif
Fournir une solution complète de monitoring IoT permettant aux utilisateurs de surveiller la qualité de l'eau et les conditions environnementales via des capteurs connectés.

---

## 🏗️ Architecture Technique

### Stack Technologique
- **Frontend** : .NET MAUI 9.0 (Multiplateforme : iOS, Android, macOS)
- **Backend** : ASP.NET Core Web API (.NET 9.0)
- **Base de données** : PostgreSQL
- **UI Framework** : Syncfusion Controls pour MAUI
- **Communication** : HTTP REST API
- **Scanner QR** : ZXing.Net.MAUI
- **Authentification** : Système de login/register personnalisé

### Plateformes Supportées
- 📱 **Android** (API 21+)
- 🍎 **iOS** (15.0+)
- 💻 **macOS** (15.0+)

---

## ⚡ Fonctionnalités Principales

### 🔐 Gestion des Utilisateurs
- **Inscription et Connexion** : Système d'authentification sécurisé
- **Profil Utilisateur** : Gestion des informations personnelles
- **Multi-utilisateurs** : Support de plusieurs comptes utilisateurs

### 📊 Tableau de Bord Principal
- **Visualisation en Temps Réel** : Graphiques interactifs des données de capteurs
- **Données Multi-Paramètres** :
  - 🌡️ **Température** (°C)
  - 🧪 **pH** (niveau d'acidité/basicité)
  - 💧 **Turbidité** (clarté de l'eau en NTU)
- **Historique de Données** : Consultation des données sur différentes périodes (24h, 7 jours, 30 jours, période personnalisée)
- **Filtrages Avancés** : Visualisation par appareil ou vue globale
- **Statistiques** : Moyennes, écarts-types et analyses des tendances

### 🔧 Gestion des Appareils
- **Scanner QR Code** : Ajout rapide d'appareils via scan de QR code
- **Création Manuelle** : Ajout d'appareils avec formulaire détaillé
- **Liste des Appareils** : Vue d'ensemble de tous les appareils associés
- **Recherche et Filtrage** : Recherche par nom ou description
- **Détails d'Appareil** : Informations complètes (nom, description, localisation, date d'installation)
- **Modification et Suppression** : Gestion complète du cycle de vie des appareils

### 🌍 Gestion des Localisations
- **Localisations Prédéfinies** : Système de localisation pour organiser les appareils
- **Association Automatique** : Liaison appareils-localisations

### 🚨 Système d'Alertes Avancé
- **Seuils Personnalisés** : Configuration de seuils min/max pour chaque paramètre
- **Alertes en Temps Réel** : Notifications automatiques lors de dépassement de seuils
- **Gestion par Appareil** : Seuils spécifiques à chaque appareil et utilisateur
- **Historique d'Alertes** : Consultation des alertes passées
- **Actions sur Alertes** : Validation et suppression d'alertes
- **Types de Paramètres Supportés** :
  - Température (plages recommandées)
  - pH (valeurs optimales)
  - Turbidité (niveaux de clarté)

### ⚙️ Paramètres et Configuration
- **Thème** : Support mode clair/sombre automatique
- **Préférences Utilisateur** : Personnalisation de l'interface
- **Gestion de Profil** : Modification des informations personnelles

---

## 🎨 Interface Utilisateur

### Design System - PoulpISence
- **Couleur Principale** : Violet (`#512BD4`) - Couleur signature de l'application
- **Palette Étendue** : Gamme de violets et gris pour une cohérence visuelle
- **Thème Adaptatif** : Interface s'adaptant automatiquement au mode clair/sombre du système
- **Icônes Modernes** : Interface iconographique intuitive
- **Navigation Fluide** : Expérience utilisateur optimisée

### Navigation
- **Shell Navigation** : Navigation par onglets principaux
- **Onglets Principaux** :
  - 🏠 **Accueil** : Tableau de bord et données en temps réel
  - 📱 **Appareils** : Gestion des appareils IoT
  - ⚠️ **Alertes** : Configuration et consultation des alertes
  - ⚙️ **Paramètres** : Configuration et profil utilisateur

---

## 📊 Données et Mesures

### Types de Capteurs Supportés
1. **Capteur de Température**
   - Plage : Configurable selon l'environnement
   - Unité : Degrés Celsius (°C)
   - Fréquence : Temps réel

2. **Capteur de pH**
   - Plage : 0-14
   - Précision : 2 décimales
   - Application : Qualité de l'eau

3. **Capteur de Turbidité**
   - Unité : NTU (Nephelometric Turbidity Units)
   - Utilisation : Mesure de la clarté de l'eau

### Stockage et Historique
- **Base de Données PostgreSQL** : Stockage robuste et scalable
- **Historique Complet** : Conservation de toutes les mesures
- **Export de Données** : Possibilité d'export des données (API)
- **Synchronisation** : Données synchronisées en temps réel

---

## 🔧 Fonctionnalités Techniques

### Connectivité
- **API REST** : Communication avec le backend via HTTP
- **Gestion Hors-Ligne** : Fonctionnement partiel sans connexion
- **Synchronisation** : Mise à jour automatique des données

### Scanner QR Code
- **ZXing.Net.MAUI** : Scanner intégré haute performance
- **Ajout Rapide** : Association instantanée d'appareils
- **Validation** : Vérification automatique de l'existence des appareils

### Sécurité
- **Authentification** : Système de login sécurisé
- **Sessions** : Gestion des sessions utilisateurs
- **Données Privées** : Isolation des données par utilisateur

---

## 🚀 Installation et Déploiement

### Prérequis
- .NET 9.0 SDK
- Visual Studio 2022 ou VS Code
- Android SDK (pour Android)
- Xcode (pour iOS/macOS)

### Configuration
1. **API Backend** : Déployer l'API sur serveur (localhost:5080 par défaut)
2. **Base de Données** : Configurer PostgreSQL avec les migrations
3. **Application Mobile** : Compiler et déployer sur les plateformes cibles

---

## 📈 Avantages et Bénéfices

### Pour les Utilisateurs
- **Interface Intuitive** : Prise en main rapide et facile
- **Mobilité** : Accès aux données depuis n'importe où
- **Alertes Proactives** : Prévention des problèmes via les seuils
- **Historique Complet** : Analyse des tendances à long terme

### Pour les Organisations
- **Surveillance Continue** : Monitoring 24h/24
- **Réduction des Coûts** : Prévention des incidents
- **Conformité** : Respect des normes environnementales
- **Scalabilité** : Support de multiples appareils et utilisateurs

---

## 🔮 Évolutions Futures

### Fonctionnalités Envisagées
- **Notifications Push** : Alertes en temps réel même app fermée
- **Rapports Automatiques** : Génération de rapports périodiques
- **Machine Learning** : Prédiction de tendances et anomalies
- **Intégration IoT Étendue** : Support de plus de types de capteurs
- **Géolocalisation** : Cartographie des appareils
- **API Publique** : Intégration avec systèmes tiers

### Améliorations Techniques
- **Performance** : Optimisation du temps de réponse
- **Offline-First** : Fonctionnement complet hors-ligne
- **Synchronisation Avancée** : Gestion des conflits de données
- **Sécurité Renforcée** : Chiffrement end-to-end

---

## 📞 Support et Contact

### Documentation Technique
- **Code Source** : Disponible dans le repository du projet
- **API Documentation** : Endpoints détaillés dans le code backend
- **Architecture** : Diagrammes et spécifications techniques

### Maintenance
- **Mises à Jour** : Déploiement via les stores d'applications
- **Support** : Équipe de développement dédiée
- **Monitoring** : Surveillance proactive de l'infrastructure

---

*PoulpISence - Votre solution IoT complète pour la surveillance environnementale* 🐙
