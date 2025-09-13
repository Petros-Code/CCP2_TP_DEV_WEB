import Joi from "joi";

const missionSchema = Joi.object({
  titre: Joi.string().min(3).max(150).required(),
  description: Joi.string().min(10).required(),
  association_id: Joi.string().guid({ version: "uuidv4" }).required(),
  max_benevoles: Joi.number().integer().min(1).default(1),
});

export default missionSchema;