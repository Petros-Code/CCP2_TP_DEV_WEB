class MissionController {
    constructor(missionRepository) {
      this.missionRepository = missionRepository;
    }
  
    async createMission(req, res) {
      try {
        const { titre, description, association_id, max_benevoles } = req.body;
  
        if (!titre || !description || !association_id) {
          return res.status(400).json({ error: "Titre, description et association_id sont requis" });
        }
  
        const mission = await this.missionRepository.createMission({
          titre,
          description,
          association_id,
          max_benevoles
        });
  
        res.status(201).json({ message: "Mission créée avec succès", mission });
      } catch (error) {
        console.error("Erreur lors de la création de la mission :", error);
        res.status(500).json({ error: "Erreur serveur" });
      }
    }

    async updateMission(req, res) {
      try {
        const { id } = req.params;
        const { titre, description, max_benevoles } = req.body;
  
        const fields = {};
        if (titre) fields.titre = titre;
        if (description) fields.description = description;
        if (max_benevoles) fields.max_benevoles = max_benevoles;
  
        const updated = await this.missionRepository.updateMission(id, fields);
  
        if (!updated) {
          return res.status(404).json({ error: "Mission non trouvée ou aucune modification" });
        }
  
        res.json({ message: "Mission mise à jour avec succès" });
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la mission :", error);
        res.status(500).json({ error: "Erreur serveur" });
      }
    }

    async deleteMission(req, res) {
      try {
        const { id } = req.params;
        const deleted = await this.missionRepository.deleteMission(id);
  
        if (!deleted) {
          return res.status(404).json({ error: "Mission non trouvée" });
        }
  
        res.json({ message: "Mission supprimée avec succès" });
      } catch (error) {
        console.error("Erreur lors de la suppression de la mission :", error);
        res.status(500).json({ error: "Erreur serveur" });
      }
    }

  }
  
  export default MissionController;
  