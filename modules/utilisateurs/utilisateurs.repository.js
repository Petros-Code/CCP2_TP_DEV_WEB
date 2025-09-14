import argon2 from "argon2";

class UserRepository {
    constructor(pool) {
        this.pool = pool;
    }

    async register({ nom, email, mot_de_passe, role }) {
        try {
            const hashed = await argon2.hash(mot_de_passe);
            const result = await this.pool.query(
                `INSERT INTO utilisateurs (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)`,
                [nom, email, hashed, role]
            );
            return { id: result.insertId, nom, email, role };
        } catch (error) {
            if (error.message.includes("UNIQUE constraint failed")) {
                throw new Error("Cet email est déjà utilisé");
            }
            throw error;
        }
    }

    async getUserByEmail(email) {
        const [rows] = await this.pool.query("SELECT * FROM utilisateurs WHERE email = ?", [email]);
        return rows[0] || null;
    }

    async login(email, mot_de_passe) {
        const user = await this.getUserByEmail(email);
        if (!user) return null;
    
        const isValid = await argon2.verify(user.mot_de_passe, mot_de_passe);
        if (!isValid) return null;
    
        return { id: user.id, nom: user.nom, email: user.email };
    }

}

export default UserRepository;



















