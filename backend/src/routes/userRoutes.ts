import { Router } from "express";
import { getAllUsers, getUserById, deleteUser } from "../controllers/userControllers";
import authMiddleware from "../middlewares/authmiddleware";

const router = Router();

// Get all users (Admins)
router.get("/", authMiddleware, getAllUsers);

// Get a single user (Admin)
router.get("/:id", authMiddleware, getUserById);

// Delete a user (Only Admins)
router.delete("/:id", authMiddleware, deleteUser);

export default router;
