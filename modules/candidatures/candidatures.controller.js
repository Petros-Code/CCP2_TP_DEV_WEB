class CandidatureController {
    constructor(candidatureRepository) {
        this.candidatureRepository = candidatureRepository;
    }

    async apply(req, res, next) {
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
            next(error);
        }
    }

    async acceptApply(req, res, next) {
        try {
            const candidatureId = req.params.id;
            const candidature = await this.candidatureRepository.acceptApply(candidatureId);

            res.json(candidature);
        } catch (error) {
            next(error);
        }
    }

    async rejectApply(req, res, next) {
        try {
            const candidatureId = req.params.id;
            const candidature = await this.candidatureRepository.rejectApply(candidatureId);

            res.json(candidature);
        } catch (error) {
            next(error);
        }
    }

    async getAllApplies(req, res, next) {
        try {
          const associationId = req.params.id;

          if (req.auth.id !== associationId) {
            const err = new Error("Accès interdit");
            err.status = 403;
            throw err;
          } 

          const candidatures = await this.candidatureRepository.getAllApplies(associationId);
          res.json(candidatures);
        } catch (error) {
            next(error);
        }
      }    
}

export default CandidatureController;