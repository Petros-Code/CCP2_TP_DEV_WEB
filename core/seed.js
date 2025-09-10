import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { faker } from "@faker-js/faker";

dotenv.config();

const seed = async () => {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    try {
        console.log("Connecté à la base");

        //DUMP avant INSERT
        await connection.query("DELETE FROM candidatures");
        await connection.query("DELETE FROM missions");
        await connection.query("DELETE FROM utilisateurs");

        console.log("Tables propres");

        //Insérer les associations
        const associations = [];
        for (let i = 0; i < 5; i++) {
            const [result] = await connection.query(
                `INSERT INTO utilisateurs (id, nom, email, mot_de_passe, role)
                VALUES (UUID(), ?, ?, ?, 'ASSOCIATION')`,
                [
                    faker.company.name(),
                    faker.internet.email(),
                    faker.internet.password(),
                ]
            );
            associations.push(result.insertId)    
        }

        const [associationsRows] = await connection.query(
            `SELECT id FROM utilisateurs WHERE role = 'ASSOCIATION'`
        );
        const associationsIds = associationsRows.map((a) => a.id);

        console.log(`${associationsIds.length} associations créées`);

        //Insérer les Bénévoles
        const benevoles = [];
        for (let i = 0; i < 95; i++) {
            await connection.query(
                `INSERT INTO utilisateurs (id, nom, email, mot_de_passe, role)
                VALUES (UUID(), ?, ?, ?, 'BENEVOLE')`,
                [
                    faker.person.fullName(),
                    faker.internet.email(),
                    faker.internet.password(),
                ]
            );
        }

        const [benevolesRows] = await connection.query(
            `SELECT id FROM utilisateurs WHERE role = 'BENEVOLE'`,
        );
        const benevolesIds = benevolesRows.map((b) => b.id);

        console.log(`${benevolesIds.length} associations créées`);

        //Insérer des missions
        const missionsIds = [];
        for (let i = 0; i < 100; i++) {
            const randomAssociation =
            associationsIds[Math.floor(Math.random() * associationsIds.length)];
            const [result] = await connection.query(
                `INSERT INTO missions (titre, description, date_de_creation, association_id, max_benevoles)
                VALUES (?, ?, CURDATE(), ?, ?)`,
                [
                    faker.lorem.sentence(),
                    faker.lorem.paragraph(),
                    randomAssociation,
                    faker.number.int({ min: 1, max: 5 }),
                ]
            );
            missionsIds.push(result.insertId);
        }

        console.log(`${missionsIds.length} missions créées`);

        //Insérer des candidatures
        const candidatureSet = new Set();

        while (candidatureSet.size < 50) {
        const randomBenevole =
        benevolesIds[Math.floor(Math.random() * benevolesIds.length)];
        const randomMission =
        missionsIds[Math.floor(Math.random() * missionsIds.length)];
        candidatureSet.add(`${randomBenevole}__${randomMission}`);
        }

        for (const entry of candidatureSet) {
        const [benevole_id, mission_id] = entry.split("__");
        const randomStatus = faker.helpers.arrayElement([
        "EN_ATTENTE",
        "ACCEPTEE",
        "REFUSEE",
        ]);

        await connection.query(
        `INSERT INTO candidatures (benevole_id, mission_id, statut)
        VALUES (?, ?, ?)`,
        [benevole_id, mission_id, randomStatus]
        );
        }

        console.log("50 candidatures uniques insérées");

        } catch (error) {
        console.error("Erreur lors du seed : ", error);
        } finally {
        await connection.end();
        console.log("Connexion close");
        }   
    };
    seed()