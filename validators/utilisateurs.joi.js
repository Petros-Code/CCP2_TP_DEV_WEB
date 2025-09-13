import Joi from "joi";

const emailMessages = {
  "string.email": "Email invalide",
  "string.min": "L'email doit contenir au moins 6 caractères",
  "any.required": "L'email est obligatoire",
  "string.empty": "L'email ne peut pas être vide",
};

const passwordMessages = {
  "string.min": "Le mot de passe doit contenir au moins 6 caractères",
  "any.required": "Le mot de passe est obligatoire",
  "string.empty": "Le mot de passe ne peut pas être vide",
};

const registerSchema = Joi.object({
  nom: Joi.string().trim().min(2).max(100).required().messages({
    "string.min": "Le nom doit contenir au moins 2 caractères",
    "string.empty": "Le nom ne peut pas être vide",
    "any.required": "Le nom est obligatoire",
  }),

  email: Joi.string().email().trim().min(6).max(100).required().messages(emailMessages),

  mot_de_passe: Joi.string().trim().min(6).max(250).required().messages(passwordMessages),

  role: Joi.string().valid("BENEVOLE", "ASSOCIATION").required().messages({
    "any.only": "Le rôle doit être 'BENEVOLE' ou 'ASSOCIATION'",
    "any.required": "Le rôle est obligatoire",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().min(6).required().messages(emailMessages),

  mot_de_passe: Joi.string().trim().min(6).required().messages(passwordMessages),
});

const updateSchema = Joi.object({
    nom: Joi.string().trim().min(2).max(100).optional(),
    email: Joi.string().email().trim().min(6).max(100).optional(),
    mot_de_passe: Joi.string().trim().min(6).max(250).optional(),
    role: Joi.string().valid("BENEVOLE", "ASSOCIATION").optional(),
  }).min(1);

export { registerSchema, loginSchema, updateSchema };
