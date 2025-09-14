import { jest } from '@jest/globals';
import argon2 from "argon2";
import UserRepository from "../modules/utilisateurs/utilisateurs.repository.js";

describe("UserRepository - Méthode login", () => {
  let utilisateurRepository;
  let simulationBaseDeDonnees;

  beforeEach(() => {
    simulationBaseDeDonnees = { 
      query: jest.fn()
    };
    utilisateurRepository = new UserRepository(simulationBaseDeDonnees);
  });

  // Test 1 : Vérifier que la connexion fonctionne avec un bon mot de passe
  it("doit retourner les informations de l'utilisateur quand le mot de passe est correct", async () => {
    
    const motDePasseCorrect = "monMotDePasseSecret";
    const motDePasseHashe = await argon2.hash(motDePasseCorrect);
    
    // mockResolvedValueOnce va retourner cette valeur à chaque fois
    simulationBaseDeDonnees.query.mockResolvedValueOnce([[
      { 
        id: 1, 
        nom: "Jean Dupont", 
        email: "jean@example.com", 
        mot_de_passe: motDePasseHashe 
      }
    ]]);

    const resultat = await utilisateurRepository.login("jean@example.com", motDePasseCorrect);
    
    expect(resultat).toEqual({ 
      id: 1, 
      nom: "Jean Dupont", 
      email: "jean@example.com" 
    });
  });

  // Test 2 : Vérifier que la connexion échoue avec un mauvais mot de passe
  it("doit retourner null quand le mot de passe est incorrect", async () => {
    const bonMotDePasse = "monMotDePasseSecret";
    const mauvaisMotDePasse = "motDePasseIncorrect";
    const motDePasseHashe = await argon2.hash(bonMotDePasse);
    
    simulationBaseDeDonnees.query.mockResolvedValueOnce([[
      { 
        id: 1, 
        nom: "Jean Dupont", 
        email: "jean@example.com", 
        mot_de_passe: motDePasseHashe 
      }
    ]]);
    
    const resultat = await utilisateurRepository.login("jean@example.com", mauvaisMotDePasse);
    
    expect(resultat).toBeNull();
  });

  // Test 3 : Vérifier que la connexion échoue si l'utilisateur n'existe pas
  it("doit retourner null quand l'utilisateur n'existe pas dans la base de données", async () => {
    simulationBaseDeDonnees.query.mockResolvedValueOnce([[]]);

    const resultat = await utilisateurRepository.login("utilisateur-inexistant@introuvalbe.com", "jesaispasquoi");
    
    expect(resultat).toBeNull();
  });
});