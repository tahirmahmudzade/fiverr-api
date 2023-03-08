import express from "express";
import * as conversationController from "../controllers/conversationController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.use(verifyToken);

router
	.route("/")
	.get(conversationController.getConversations)
	.post(conversationController.createConversations);

router
	.route("/:id")
	.get(conversationController.getConversation)
	.patch(conversationController.updateConversations);

export default router;
