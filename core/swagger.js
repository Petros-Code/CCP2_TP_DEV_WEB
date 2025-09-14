import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PortalAsso API',
      version: '1.0.0',
      description: 'Projet d\'Examen CCP2 : API REST pour la gestion d\'associations et de missions bénévoles',
      contact: {
        name: 'Petros-Code',
        email: 'petros-code@proton.me'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'Token JWT stocké dans un cookie sécurisé'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['nom', 'email', 'mot_de_passe', 'role'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Identifiant unique de l\'utilisateur'
            },
            nom: {
              type: 'string',
              description: 'Nom de l\'utilisateur',
              example: 'Jean Dupont'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Adresse email de l\'utilisateur',
              example: 'jean.dupont@example.com'
            },
            role: {
              type: 'string',
              enum: ['BENEVOLE', 'ASSOCIATION'],
              description: 'Rôle de l\'utilisateur'
            }
          }
        },
        UserRegister: {
          type: 'object',
          required: ['nom', 'email', 'mot_de_passe', 'role'],
          properties: {
            nom: {
              type: 'string',
              description: 'Nom de l\'utilisateur',
              example: 'Jean Dupont'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Adresse email de l\'utilisateur',
              example: 'jean.dupont@example.com'
            },
            mot_de_passe: {
              type: 'string',
              minLength: 6,
              description: 'Mot de passe (minimum 6 caractères)',
              example: 'motdepasse123'
            },
            role: {
              type: 'string',
              enum: ['BENEVOLE', 'ASSOCIATION'],
              description: 'Rôle de l\'utilisateur'
            }
          }
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'mot_de_passe'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Adresse email de l\'utilisateur',
              example: 'jean.dupont@example.com'
            },
            mot_de_passe: {
              type: 'string',
              description: 'Mot de passe de l\'utilisateur',
              example: 'motdepasse123'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Message d\'erreur'
            },
            details: {
              type: 'string',
              description: 'Détails de l\'erreur'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message de succès'
            },
            user: {
              $ref: '#/components/schemas/User'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './modules/*/*.js']
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
