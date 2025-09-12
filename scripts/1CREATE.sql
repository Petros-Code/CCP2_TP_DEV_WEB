CREATE DATABASE IF NOT EXISTS PORTAL_ASSO_DB;
USE PORTAL_ASSO_DB;

DROP TABLE IF EXISTS candidatures;
DROP TABLE IF EXISTS missions;
DROP TABLE IF EXISTS utilisateurs;


CREATE TABLE IF NOT EXISTS utilisateurs (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(250) NOT NULL,
    role ENUM('BENEVOLE', 'ASSOCIATION') NOT NULL
);

CREATE TABLE IF NOT EXISTS missions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    date_de_creation DATE NOT NULL,
    association_id CHAR(36) NOT NULL,
    max_benevoles INT DEFAULT 1,
    FOREIGN KEY (association_id) REFERENCES utilisateurs(id)
);

CREATE TABLE IF NOT EXISTS candidatures (
    id INT PRIMARY KEY AUTO_INCREMENT,
    benevole_id CHAR(36) NOT NULL,
    mission_id INT NOT NULL,
    statut ENUM('EN_ATTENTE', 'ACCEPTEE', 'REFUSEE') DEFAULT 'EN_ATTENTE',
    date_de_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (benevole_id) REFERENCES utilisateurs(id),
    FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE,
    UNIQUE (benevole_id, mission_id)
);