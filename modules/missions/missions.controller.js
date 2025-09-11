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
  }
  
  export default MissionController;
  