import { Router } from "express";
import { 
  createProject, 
  updateProject, 
  getCustomerProjects,
  addProjectUpdate,
  uploadProjectFiles,
  getProjectById
} from "../controllers/projectControllers";
import authMiddleware from "../middlewares/authmiddleware";
import upload from "../config/multer";

const router = Router();

router.post("/create", authMiddleware, createProject);
router.get("/customer/:id", authMiddleware, getCustomerProjects);
router.get("/:id", authMiddleware, getProjectById);
router.put("/update/:id", authMiddleware, updateProject);
router.post("/update/:id/files", authMiddleware, upload.array('files', 10), uploadProjectFiles);
router.post("/update/:id/progress", authMiddleware, upload.array('files', 10), addProjectUpdate);

export default router;
