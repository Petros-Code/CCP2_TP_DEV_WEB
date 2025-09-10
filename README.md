# CCP2_TP_DEV_WEB
Examen BackEnd

## 📌 Description
Projet réalisé dans le cadre de l’examen **CCP2 – Développement Web Back-End**.  
Il s’agit d’une application Node.js avec Express et MySQL, organisée en architecture en couches (routes, contrôleurs, services, repositories).  

## 🚀 Fonctionnalités
- CRUD utilisateurs.  
- Authentification avec **JWT** et **cookies**.  
- Validation des données avec **Joi**.  
- Middleware d’authentification et gestion des rôles.  
- Base de données MySQL (pool de connexions).  
- Script `seed.js` pour générer des données fictives (**faker**).  

## 🛠️ Installation
1. Cloner le projet :  
   git clone https://github.com/Petros-Code/CCP2_TP_DEV_WEB.git
   cd CCP2_TP_DEV_WEB

2. Installer les dépendances :
    npm install

3. Créer un fichier .env : 
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=portal_asso_db

    JWT_SECRET=secret

4. Lancer le serveur : 
    npm run dev

### 📂 Structure
├── core/           # Routes Express
├── middlewares/    # Auth / Rôle / errorHandler
├── module/         # CRUD
├── routes/         # Routes Express
├── scripts/        # scripts SQL
├── validators/     # Validation JOI
└── index.js        # Point d’entrée

#### 👨‍💻 Auteur
Projet réalisé par Petros – Examen CCP2 Développement Web.