# 📱 Charte Graphique - PoulpISence IOT

## 🎨 Identité du Projet

- **Nom de l'application** : PoulpISence
- **Domaine** : Application Mobile IOT pour la surveillance de capteurs
- **Plateforme** : .NET MAUI (Android, iOS, macOS)
- **Framework UI** : .NET MAUI 9.0 avec Syncfusion Controls

---

## 🎯 Palette de Couleurs

### Couleurs Principales

| Couleur | Code Hex | Usage | Description |
|---------|----------|--------|-------------|
| **Primary** | `#512BD4` | Boutons principaux, accents | Violet principal - couleur signature |
| **PrimaryDark** | `#ac99ea` | Mode sombre | Version claire pour le thème sombre |
| **PrimaryDarkText** | `#242424` | Texte sur fond sombre | Gris foncé pour la lisibilité |
| **Secondary** | `#DFD8F7` | Arrière-plans, zones de focus | Violet très clair |
| **SecondaryDarkText** | `#9880e5` | Texte secondaire mode sombre | Violet moyen |
| **Tertiary** | `#2B0B98` | Éléments d'accent | Violet profond |

### Couleurs Fonctionnelles

| Couleur | Code Hex | Usage |
|---------|----------|--------|
| **White** | `White` | Arrière-plans clairs |
| **Black** | `Black` | Textes principaux |
| **Magenta** | `#D600AA` | Éléments de navigation |
| **MidnightBlue** | `#190649` | Titres importants |
| **OffBlack** | `#1f1f1f` | Arrière-plan mode sombre |

### Gamme de Gris

| Nuance | Code Hex | Usage |
|--------|----------|--------|
| **Gray100** | `#E1E1E1` | Bordures légères |
| **Gray200** | `#C8C8C8` | Séparateurs |
| **Gray300** | `#ACACAC` | Texte désactivé |
| **Gray400** | `#919191` | Placeholders |
| **Gray500** | `#6E6E6E` | Texte secondaire |
| **Gray600** | `#404040` | Texte sur fond sombre |
| **Gray900** | `#212121` | Texte principal |
| **Gray950** | `#141414` | Arrière-plans très sombres |

---

## 🔤 Typographie

### Polices de Caractères

| Police | Fichier | Usage | Alias |
|--------|---------|--------|-------|
| **Open Sans Regular** | `OpenSans-Regular.ttf` | Texte courant | `OpenSansRegular` |
| **Open Sans Semibold** | `OpenSans-Semibold.ttf` | Titres et emphases | `OpenSansSemibold` |
| **Font Awesome 6** | `Font Awesome 6 Free-Solid-900.otf` | Icônes principales | `FontSolid` |
| **Fluent System Icons** | `FluentSystemIcons-Regular.ttf` | Icônes système | `FluentSystemIcons` |
| **Maui Material Assets** | `MauiMaterialAssets.ttf` | Icônes Material | - |

### Hiérarchie Typographique

| Style | Taille | Poids | Usage |
|-------|--------|-------|--------|
| **Headline** | 32sp | Normal | Titres principaux |
| **SubHeadline** | 24sp | Normal | Sous-titres |
| **Body** | 14sp | Normal | Texte courant |
| **Caption** | 12sp | Normal | Légendes |

---

## 🎭 Thèmes et Modes

### Mode Clair (Light Theme)
- **Arrière-plan principal** : `White`
- **Texte principal** : `Black`
- **Couleur primaire** : `#512BD4`
- **Bordures** : `Gray200`

### Mode Sombre (Dark Theme)
- **Arrière-plan principal** : `OffBlack` (`#1f1f1f`)
- **Texte principal** : `White`
- **Couleur primaire** : `PrimaryDark` (`#ac99ea`)
- **Bordures** : `Gray500`

---

## 🎨 Composants UI

### Boutons

```xaml
<!-- Style par défaut -->
<Button 
    BackgroundColor="{AppThemeBinding Light={StaticResource Primary}, Dark={StaticResource PrimaryDark}}"
    TextColor="{AppThemeBinding Light={StaticResource White}, Dark={StaticResource PrimaryDarkText}}"
    FontFamily="OpenSansRegular"
    FontSize="14"
    CornerRadius="8"
    Padding="14,10"
    MinimumHeightRequest="44" />
```

### Champs de Saisie (Entry)

```xaml
<Entry 
    TextColor="{AppThemeBinding Light={StaticResource Black}, Dark={StaticResource White}}"
    BackgroundColor="Transparent"
    FontFamily="OpenSansRegular"
    FontSize="14"
    PlaceholderColor="{AppThemeBinding Light={StaticResource Gray200}, Dark={StaticResource Gray500}}" />
```

### Cartes (Frame)

```xaml
<Frame 
    BackgroundColor="{AppThemeBinding Light={StaticResource White}, Dark={StaticResource Black}}"
    CornerRadius="8"
    HasShadow="False"
    BorderColor="Transparent" />
```

---

## 🔧 Icônes

### Icônes Font Awesome (FontSolid)

| Icône | Code Unicode | Usage |
|-------|--------------|--------|
| **User** | `&#xf007;` | Profil utilisateur |
| **Alert** | `&#xf071;` | Alertes/Avertissements |
| **Bell** | `&#xf0f3;` | Notifications |
| **Plus** | `&#xf067;` | Ajout d'éléments |
| **Chart** | `&#xf200;` | Graphiques |
| **Mobile** | `&#xf3cd;` | Appareils mobiles |
| **Thermometer** | `&#xf2c7;` | Capteurs de température |
| **Flask** | `&#xf0c3;` | Capteurs chimiques |
| **Eye** | `&#xf06e;` | Visualisation |
| **Lightbulb** | `&#xf0eb;` | Capteurs luminosité |
| **Save** | `&#xf0c7;` | Sauvegarde |
| **Edit** | `&#xf044;` | Édition |
| **Trash** | `&#xf1f8;` | Suppression |
| **Check** | `&#xf00c;` | Validation |
| **Sync** | `&#xf021;` | Synchronisation |

### Icônes Interface

| Icône | Code Unicode | Usage |
|-------|--------------|--------|
| **Home** | `&#xf015;` | Page d'accueil |
| **Arrow Right** | `&#xf061;` | Navigation |
| **Star** | `&#xf005;` | Favoris |
| **Hand Wave** | `&#xf256;` | Bienvenue |

---

## 🎯 Règles de Design

### Espacements

- **Padding standard** : 16-24dp
- **Marges entre éléments** : 8-16dp
- **Hauteur minimale des boutons** : 44dp
- **Hauteur minimale touch targets** : 44dp

### Bordures et Coins

- **Radius standard** : 8dp
- **Radius cards** : 12-20dp
- **Épaisseur bordures** : 1dp
- **Bordures transparentes** pour les éléments focalisables

### Ombres

- **Ombre standard** : `Radius="15", Opacity="0.5", Offset="10,10"`
- **Ombre navigation** : `Radius="20", Opacity="0.1", Offset="0,-4"`

---

## 📱 Navigation et Structure

### Navigation Bottom Bar

- **Arrière-plan** : `White` (clair) / `Black` (sombre)
- **Coins arrondis** : 20dp (haut uniquement)
- **Ombre portée** : Subtle avec offset négatif
- **États sélection** : Background coloré + icône mise en valeur

### Pages

- **Arrière-plan** : `White` (clair) / `OffBlack` (sombre)
- **Padding** : 0 (géré par les conteneurs)
- **Structure** : Grid layouts avec définitions claires

---

## ⚡ États Interactifs

### États des Boutons

| État | Apparence |
|------|-----------|
| **Normal** | Couleurs standards |
| **Disabled** | Gray300/Gray600 selon le thème |
| **Pressed** | Légère transparence |

### États des Champs

| État | Apparence |
|------|-----------|
| **Normal** | Bordures subtiles |
| **Focus** | Couleur primaire |
| **Error** | Rouge d'erreur |
| **Disabled** | Gris désactivé |

---

## 🌐 Responsive Design

### Adaptabilité

- **Tailles multiples** : Support iOS, Android, macOS
- **Densités d'écran** : Gestion automatique des DPI
- **Orientations** : Portrait et paysage
- **Accessibilité** : Contrastes WCAG conformes

---

## 🔧 Configuration Technique

### Assemblages de Styles

```xml
<!-- Inclusion dans App.xaml -->
<ResourceDictionary.MergedDictionaries>
    <ResourceDictionary Source="Resources/Styles/Colors.xaml" />
    <ResourceDictionary Source="Resources/Styles/Styles.xaml" />
    <ResourceDictionary Source="Resources/Styles/Icons.xaml" />
</ResourceDictionary.MergedDictionaries>
```

### Configuration des Polices

```csharp
// Dans MauiProgram.cs
.ConfigureFonts(fonts =>
{
    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
    fonts.AddFont("Font Awesome 6 Free-Solid-900.otf", "FontSolid");
    fonts.AddFont("FluentSystemIcons-Regular.ttf", "FluentSystemIcons");
})
```

---

## ✅ Guidelines d'Utilisation

### ✅ À Faire

- Utiliser les couleurs définies dans la palette
- Respecter les hiérarchies typographiques
- Maintenir la cohérence des espacements
- Appliquer les themes automatiques (Light/Dark)
- Utiliser les icônes Font Awesome pour la cohérence

### ❌ À Éviter

- Créer de nouvelles couleurs sans justification
- Mélanger différentes familles de polices
- Ignorer les états interactifs
- Oublier l'accessibilité et les contrastes
- Utiliser des espacements arbitraires

---

## 📄 Fichiers Sources

- **Couleurs** : `/Resources/Styles/Colors.xaml`
- **Styles** : `/Resources/Styles/Styles.xaml`
- **Icônes** : `/Resources/Styles/Icons.xaml`
- **Configuration** : `/MauiProgram.cs`
- **Polices** : `/Resources/Fonts/`

---

*Dernière mise à jour : Décembre 2024*  
*Version : 1.0*
