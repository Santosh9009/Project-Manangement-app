import { Router } from "express";
import { addCustomer, getCustomers, getCustomerById } from "../controllers/customerController";
import authMiddleware from "../middlewares/authmiddleware";

const router = Router();

router.post("/add", authMiddleware, addCustomer);
router.get("/", authMiddleware, getCustomers);
router.get("/:id", authMiddleware, getCustomerById);

export default router;
