import express from "express";
import { register, login } from "../controllers/authController";
import {
  validateRegistration,
  validateLogin,
} from "../middlewares/validationMiddleware";

const router = express.Router();

// POST /register: Register a new user
router.post("/register", validateRegistration, register);

// POST /login: Log in a user
router.post("/login", validateLogin, login);

export default router;
