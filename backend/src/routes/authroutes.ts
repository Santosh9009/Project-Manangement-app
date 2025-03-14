import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/authControllers";
import authMiddleware from "../middlewares/authmiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
