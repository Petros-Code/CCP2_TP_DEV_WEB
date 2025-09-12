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

      async updateMission(id, fields) {
        try {
          const keys = Object.keys(fields);
          if (keys.length === 0) return null;
    
          const updates = keys.map((key) => `${key} = ?`).join(", ");
          const values = Object.values(fields);
    
          const [result] = await this.pool.execute(
            `UPDATE missions SET ${updates} WHERE id = ?`,
            [...values, id]
          );
    
          return result.affectedRows > 0;
        } catch (error) {
          throw new Error("Erreur lors de la mise à jour de la mission : " + error.message);
        }
      }

      async deleteMission(id) {
        try {
          const [result] = await this.pool.execute(
            `DELETE FROM missions WHERE id = ?`,
            [id]
          );
    
          return result.affectedRows > 0;
        } catch (error) {
          throw new Error("Erreur lors de la suppression de la mission : " + error.message);
        }
      }

      async getAllMissions() {
        try {
        const [rows] = await this.pool.execute(`
          SELECT m.id, m.titre, m.description, m.date_de_creation, m.max_benevoles, u.nom AS association_nom
          FROM missions m
          JOIN utilisateurs u ON m.association_id = u.id
          ORDER BY m.date_de_creation DESC
          `);
          return rows;
            } catch (error) {
            throw new Error("Erreur lors de la récupération des missions : " + error.message);
            }
          }


}

export default MissionRepository;