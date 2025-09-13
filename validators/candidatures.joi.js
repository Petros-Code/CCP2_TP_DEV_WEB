import Joi from "joi";

const candidatureSchema = Joi.object({
  benevole_id: Joi.string().guid({ version: "uuidv4" }).required(),
  mission_id: Joi.number().integer().positive().required(),
});

export default candidatureSchema;
