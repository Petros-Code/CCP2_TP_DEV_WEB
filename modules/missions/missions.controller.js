class MissionController {
    constructor(missionRepository) {
      this.missionRepository = missionRepository;
    }
  
    async createMission(req, res, next) {
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
        next(error);
      }
    }

    async updateMission(req, res, next) {
      try {
        const { id } = req.params;
        const { titre, description, max_benevoles } = req.body;
  
        const fields = {};
        if (titre) fields.titre = titre;
        if (description) fields.description = description;
        if (max_benevoles) fields.max_benevoles = max_benevoles;
  
        const updated = await this.missionRepository.updateMission(id, fields);
  
        if (!updated) {
          const err = new Error("Mission non trouvée ou aucune modification");
          err.status = 404;
          throw err;
        }
  
        res.json({ message: "Mission mise à jour avec succès" });
      } catch (error) {
        next(error);
      }
    }

    async deleteMission(req, res, next) {
      try {
        const { id } = req.params;
        const deleted = await this.missionRepository.deleteMission(id);
  
        if (!deleted) {
          const err = new Error("Mission non trouvée");
          err.status = 404;
          throw err;
        }
  
        res.json({ message: "Mission supprimée avec succès" });
      } catch (error) {
        next(error);
      }
    }

    async getAllMissions(req, res, next) {
      try {
        const missions = await this.missionRepository.getAllMissions();
        res.status(200).json(missions);
      } catch (error) {
        next(error);
      }
    }

  }
  
  export default MissionController;
  