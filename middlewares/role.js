import pool from "../core/config.js";

const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userId = req.auth?.id;
            if (!userId) {
                return res.status(401).json({ message: "Utilisateur non authentifié" });
            }

            const [rows] = await pool.query(
                `SELECT role
                FROM utilisateurs
                WHERE id = ?`,
                [userId]
            );

            if (rows.length === 0) {
                return res.status(404).json({ error: "Utilisateur introuvable" });
            }

            const userRole = rows[0].role;

            if(!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: "Accès interdit : rôle insuffisant" });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur Serveur"});
        }
    };
};

export default checkRole