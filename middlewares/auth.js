import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Token manquant (cookie absent)" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = { id: payload.id };
    next();
    } catch (error) {
      return res.status(403).json({ error: "Token invalide ou expiré" });
  }
};

export default authMiddleware;
