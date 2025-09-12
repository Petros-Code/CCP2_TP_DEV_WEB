class CandidatureRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async apply({ benevole_id, mission_id }) {
        try {
            const [result] = await this.pool.query(
                `INSERT INTO candidatures (benevole_id, mission_id)
                VALUES (?, ?)`,
                [benevole_id, mission_id]
            );

            return {
                id: result.insertId,
                benevole_id,
                mission_id,
                statut: "EN ATTENTE",
                date_de_creation: new Date().toISOString(),
            };

        } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
            throw new Error("Vous avez déjà candidaté à cette mission.");
            }
            throw new Error("Erreur lors de la candidature : " + error.message);
        }
    }

    async acceptApply(candidatureId) {
        try {
            const [result] = await this.pool.query(
                `UPDATE candidatures
                SET statut = 'ACCEPTEE'
                WHERE id = ?`,
                [candidatureId]
            );

            if(result.affectedRows === 0) {
                throw new Error("Candidature introuvable.");
            }

            return { id: candidatureId, statut: "ACCEPTEE" };
        } catch (error) {
            throw new Error("Erreur lors de l'acceptation : " + error.message);
        }
    }

    async rejectApply(candidatureId) {
        try {
            const [result] = await this.pool.query(
                `UPDATE candidatures
                SET statut = 'REFUSEE'
                WHERE id = ?`,
                [candidatureId]
            );

            if(result.affectedRows === 0) {
                throw new Error("Candidature introuvable.");
            }

            return { id: candidatureId, statut: "REFUSEE" };
        } catch (error) {
            throw new Error("Erreur lors du refus : " + error.message);
        }
    }

    async getAllApplies(associationId) {
        try {
            const [rows] = await this.pool.query(`
                SELECT c.id, c.statut, c.date_de_creation,
                u.id AS benevole_id, u.nom AS benevole_nom, u.email AS benevole_email,
                m.id AS mission_id, m.titre AS mission_titre
                FROM candidatures c
                JOIN utilisateurs u ON c.benevole_id = u.id
                JOIN missions m ON c.mission_id = m.id
                WHERE m.association_id = ?
                ORDER BY c.date_de_creation DESC
                `,
                [associationId]
            );
            return rows;
        } catch (error) {
            throw new Error("Erreur lors de la récupération des candidatures : " + error.message);
        }
    }
}

export default CandidatureRepository;