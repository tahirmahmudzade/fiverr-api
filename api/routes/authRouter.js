import express from "express";
import * as authController from "../controllers/authController.js";
const router = express.Router();

router
	.post("/register", authController.register)
	.post("/login", authController.login)
	.post("/logout", authController.logout);

export default router;
