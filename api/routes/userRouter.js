import express from "express";
import * as userController from "../controllers/userController.js";
import * as jwtMw from "../middleware/jwt.js";

const router = express.Router();

router.use(jwtMw.verifyToken);

router.route("/").get(userController.getAllUsers);

router
	.route("/:id")
	.get(userController.getUser)
	.delete(userController.deleteUser);

export default router;
