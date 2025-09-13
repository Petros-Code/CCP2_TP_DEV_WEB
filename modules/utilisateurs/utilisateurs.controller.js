import jwt from "jsonwebtoken";

class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(req, res, next) {
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
          next(error);
        }
    }

    async getUserByEmail(req, res, next) {
        try {
            const { email } = req.params;
            const user = await this.userRepository.getUserByEmail(email);
            if (!user) {
                const err = new Error("Utilisateur non trouvé");
                err.status = 404;
                throw err;
            }
            res.status(200).json({ user })
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
          const { email, mot_de_passe } = req.body;
    
          if (!email || !mot_de_passe)
            return res.status(400).json({ error: "Email et mot de passe requis" });
    
          const user = await this.userRepository.login(email, mot_de_passe);
          if (!user) {
            const err = new Error("Identifiants incorrects");
            err.status = 401;
            throw err;
          }
    
          const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
          );
    
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.ENV === "production",
            sameSite: "strict",
            maxAge: 3 * 60 * 60 * 1000,
          });
    
          res.status(200).json({
            message: "Connexion réussie",
            user: { id: user.id, email: user.email },
          });
        } catch (error) {
          next(error);
        }
    }

    async logout(req, res) {
        res.clearCookie("token");
        res.json({ message: "Déconnecté avec succès" });
    }

}

export default UserController;