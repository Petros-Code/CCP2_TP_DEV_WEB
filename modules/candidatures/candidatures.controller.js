class CandidatureController {
    constructor(candidatureRepository) {
        this.candidatureRepository = candidatureRepository;
    }

    async apply(req, res) {
        try {
            const { benevole_id, mission_id } = req.body;

            if(!benevole_id || !mission_id) {
                return res.status(400).json({ error: "benevole_id et mission_id sont requis" });
            }

            const candidature = await this.candidatureRepository.apply({
                benevole_id,
                mission_id,
              });

              res.status(201).json({
                message: "Candidature envoyée avec succès",
                candidature,
              });

        } catch (error) {
            console.error("Erreur lors de l'application :", error);
            res.status(400).json({ error: error.message });
        }
    }


















}

export default CandidatureController;