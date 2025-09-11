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

}

export default UserRepository;



















