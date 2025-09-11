class MissionRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async createMission({ titre, description, association_id, max_benevoles }) {
        try {
          const [result] = await this.pool.execute(
            `INSERT INTO missions (titre, description, date_de_creation, association_id, max_benevoles)
             VALUES (?, ?, NOW(), ?, ?)`,
            [titre, description, association_id, max_benevoles || 1]
          );
        
          return {
            id: result.insertId,
            titre,
            description,
            association_id,
            max_benevoles: max_benevoles || 1,
            date_de_creation: new Date().toISOString().split("T")[0]
          };
        } catch (error) {
          throw new Error("Erreur lors de la création de la mission : " + error.message);
        }
      }  


}

export default MissionRepository;