import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any; // Store user details from JWT
}

const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
