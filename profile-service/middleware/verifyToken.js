import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  // Prefer cookie (your login sets it), but also allow Bearer
  const fromCookie = req.cookies?.token;
  const fromHeader = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  const token = fromCookie || fromHeader;
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id, email, userType, iat, exp }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verify failed:", err.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
