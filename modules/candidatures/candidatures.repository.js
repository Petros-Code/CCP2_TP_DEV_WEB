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

    // async acceptApply() {
    //     try {

    //     } catch (error) {
            
    //     }
    // }

    // async rejectApply() {
    //     try {

    //     } catch (error) {
            
    //     }
    // }
}

export default CandidatureRepository;