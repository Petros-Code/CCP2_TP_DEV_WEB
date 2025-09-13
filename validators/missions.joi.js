import Joi from "joi";

const missionSchema = Joi.object({
  titre: Joi.string()
    .min(3)
    .max(150)
    .required()
    .messages({
      "string.base": "Le titre doit être une chaîne de caractères.",
      "string.empty": "Le titre est requis.",
      "string.min": "Le titre doit contenir au moins 3 caractères.",
      "string.max": "Le titre ne doit pas dépasser 150 caractères.",
      "any.required": "Le titre est requis."
    }),
  description: Joi.string()
    .min(10)
    .required()
    .messages({
      "string.base": "La description doit être une chaîne de caractères.",
      "string.empty": "La description est requise.",
      "string.min": "La description doit contenir au moins 10 caractères.",
      "any.required": "La description est requise."
    }),
  association_id: Joi.string()
    .guid({ version: "uuidv1" })
    .required()
    .empty("")
    .messages({
      "string.base": "L'identifiant de l'association doit être une chaîne de caractères.",
      "string.guid": "L'identifiant de l'association doit être un UUID valide.",
      "any.required": "L'identifiant de l'association est requis.",
      "string.empty": "L'identifiant de l'association est requis."
    }),
  max_benevoles: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      "number.base": "Le nombre maximum de bénévoles doit être un nombre.",
      "number.integer": "Le nombre maximum de bénévoles doit être un entier.",
      "number.min": "Le nombre maximum de bénévoles doit être au moins 1."
    }),
});

const missionUpdateSchema = Joi.object({
  titre: Joi.string()
    .min(3)
    .max(150)
    .messages({
      "string.base": "Le titre doit être une chaîne de caractères.",
      "string.min": "Le titre doit contenir au moins 3 caractères.",
      "string.max": "Le titre ne doit pas dépasser 150 caractères."
    }),
  description: Joi.string()
    .min(10)
    .messages({
      "string.base": "La description doit être une chaîne de caractères.",
      "string.min": "La description doit contenir au moins 10 caractères."
    }),
  max_benevoles: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "any.required": "Veuillez renseigner le nombre maximum de bénévoles (soit l'ancien, soit un nouveau).",
      "number.base": "Le nombre maximum de bénévoles doit être un nombre compris entre 1 .",
      "number.integer": "Le nombre maximum de bénévoles doit être un entier.",
      "number.min": "Le nombre maximum de bénévoles doit être au moins 1."
    }),
});

export { missionSchema, missionUpdateSchema };