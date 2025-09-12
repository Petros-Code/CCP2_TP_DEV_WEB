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

    async acceptApply(req, res) {
        try {
            const candidatureId = req.params.id;
            const candidature = await this.candidatureRepository.acceptApply(candidatureId);

            res.json(candidature);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async rejectApply(req, res) {
        try {
            const candidatureId = req.params.id;
            const candidature = await this.candidatureRepository.rejectApply(candidatureId);

            res.json(candidature);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

export default CandidatureController;