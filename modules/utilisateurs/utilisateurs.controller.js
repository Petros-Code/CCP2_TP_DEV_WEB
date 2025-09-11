// import jwt from "jsonwebtoken";

class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(req, res) {
        try {
          const { nom, email, mot_de_passe, role } = req.body;
          
          //à supprimer quand validteurs JOI : OK
          if (!nom) return res.status(400).json({ error: "Nom requis" });
          if (!email) return res.status(400).json({ error: "Email requis" });
          if (!mot_de_passe) return res.status(400).json({ error: "Mot de passe requis" });
          if (!role) return res.status(400).json({ error: "Veuillez choisir un rôle" });
    
          const newUser = await this.userRepository.register({ nom, email, mot_de_passe, role });
    
          res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }
}

export default UserController;