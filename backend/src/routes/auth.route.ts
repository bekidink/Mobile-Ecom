import { Router } from "express";
import { validateData } from "../middlewares/validationMiddleware.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register",  registerUser);
router.post("/login",  loginUser);

export default router;
