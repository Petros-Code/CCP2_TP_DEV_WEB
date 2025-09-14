# PortalAsso

> **API REST pour la gestion de missions associatives, proposées à des bénévoles**

Projet réalisé dans le cadre de l'examen **CCP2 – Développement Web Back-End**.  
Application Node.js avec Express et MySQL, organisée en architecture en couches (routes, contrôleurs, repositories).

---

## Description

PortalAsso est une API REST qui permet de gérer :
- **Associations** : Création et gestion de comptes
- **Bénévoles** : Inscription et candidatures
- **Missions** : Publication et gestion des missions
- **Candidatures** : Système de candidature et validation

---

## Fonctionnalités

### Authentification & Sécurité
- **JWT** avec cookies sécurisés
- **Hachage** des mots de passe avec Argon2
- **Middleware** d'authentification et gestion des rôles
- **Validation** des données avec Joi

### Base de données
- **MySQL** avec pool de connexions
- **Scripts SQL** de création et d'insertion
- **Seed** avec données fictives (Faker.js)

### Tests
- **Tests unitaires** avec Jest
- **Tests continus** en mode watch

---

## Installation rapide

### 1. Cloner le projet
```bash
git clone https://github.com/Petros-Code/CCP2_TP_DEV_WEB.git
cd CCP2_TP_DEV_WEB
```

### 2. Installer les dépendances
```bash
npm install faker-js argon2 cookie-parser dotenv express jest joi jsonwebtoken mysql2 path
```

### 3. Configuration de la base de données
Créer un fichier `.env` à la racine :
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
DB_NAME=portal_asso_db
JWT_SECRET=ton_secret_jwt
ENV=development
```

### 4. Initialiser la base de données
```bash
# Créer les tables
mysql -u root -p < scripts/1CREATE.sql
ou le copier et l'executer vous même dans votre logiciel de gestion de BDD

# Insérer des données de test
npm run seed
```

### 5. Lancer l'application
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

---

## Tests

```bash
# Tests normaux
npm test

# Tests continus (mode watch) - RECOMMANDÉ
npm run test:watch
```

---

## Documentation API

### Documentation interactive Swagger
Une documentation interactive complète est disponible à l'adresse :
**http://localhost:3000/api-docs**

Cette documentation permet de :
- ✅ **Tester les endpoints** directement dans le navigateur
- ✅ **Voir les exemples** de requêtes et réponses
- ✅ **Comprendre** la structure des données
- ✅ **Authentifier** avec les cookies JWT

### Endpoints API

### Utilisateurs
- `POST /utilisateurs/register` - Inscription
- `POST /utilisateurs/login` - Connexion
- `POST /utilisateurs/logout` - Déconnexion
- `GET /utilisateurs/:email` - Profil utilisateur

### Missions
- `GET /missions` - Liste des missions
- `POST /missions/create` - Créer une mission (Association)
- `PATCH /missions/:id` - Modifier une mission (Association)
- `DELETE /missions/:id` - Supprimer une mission (Association)

### Candidatures
- `POST /candidatures/apply` - Candidater (Bénévole)
- `PATCH /candidatures/:id/accept` - Accepter (Association)
- `PATCH /candidatures/:id/reject` - Refuser (Association)
- `GET /candidatures/association/:id` - Voir les candidatures (Association)

---

## Structure du projet

```
PortalAsso/
├── core/                   # Configuration et seed
│   ├── config.js           # Configuration base de données
│   └── seed.js             # Génération de données fictives
├── middlewares/            # Middlewares Express
│   ├── auth.js             # Authentification JWT
│   ├── role.js             # Gestion des rôles
│   └── errorHandler.js     # Gestion centralisée des erreurs
├── modules/                # Logique métier
│   ├── utilisateurs/       # Gestion des utilisateurs
│   ├── missions/           # Gestion des missions
│   └── candidatures/       # Gestion des candidatures
├── routes/                 # Routes Express
│   ├── utilisateurs.routes.js
│   ├── missions.routes.js
│   └── candidatures.routes.js
├── validators/             # Validation Joi
│   ├── utilisateurs.joi.js
│   ├── missions.joi.js
│   └── candidatures.joi.js
├── tests/                  # Tests unitaires
│   └── utilisateurs.repository.test.js
├── scripts/                # Scripts SQL
│   ├── 1CREATE.sql         # Création des tables
│   └── 2INSERT.sql         # Données de base
└── index.js                # Point d'entrée
```

---

## Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Base de données
- **JWT** - Authentification
- **Argon2** - Hachage des mots de passe
- **Joi** - Validation des données
- **Jest** - Tests unitaires
- **Faker.js** - Génération de données fictives

---

## Scripts disponibles

```bash
npm start          # Lancer en production
npm run dev        # Lancer en développement (nodemon)
npm test           # Lancer les tests
npm run test:watch # Tests continus
npm run test:ci    # Tests avec couverture
npm run seed       # Générer des données de test
```

---

## 👨‍💻 Auteur

**Projet** réalisé par **Petros-Code** – Examen CCP2 TP Développeur Web & Mobile.

---
