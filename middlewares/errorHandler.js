import Joi from "joi";

const errorHandler = (err, req, res, next) => {
  console.error("Erreur :", err.message);

  if (err.status === 400) {
    return res.status(400).json({ error: "Requête invalide", details: err.message });
  }

  if (err.status === 404) {
    return res.status(404).json({ error: "Ressource non trouvée", details: err.message });
  }

  if (err.status === 401) {
    return res.status(401).json({ error: "Non autorisé", details: err.message });
  }

  res.status(err.status || 500).json({
    error: "Erreur interne du serveur",
    details: err.message || "Une erreur inconnue est survenue",
  });
};

export default errorHandler;
