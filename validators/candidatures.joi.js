import Joi from "joi";

const candidatureSchema = Joi.object({
  benevole_id: Joi.string()
    .guid({ version: "uuidv1" })
    .required()
    .empty("")
    .messages({
      "string.base": "L'identifiant du bénévole doit être une chaîne de caractères.",
      "string.guid": "L'identifiant du bénévole doit être un UUID v4 valide.",
      "any.required": "L'identifiant du bénévole est requis.",
      "string.empty": "L'identifiant du bénévole est requis."
    }),
  mission_id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "L'identifiant de la mission doit être un nombre.",
      "number.integer": "L'identifiant de la mission doit être un entier.",
      "number.positive": "L'identifiant de la mission doit être positif.",
      "any.required": "L'identifiant de la mission est requis."
    }),
});

export default candidatureSchema;
