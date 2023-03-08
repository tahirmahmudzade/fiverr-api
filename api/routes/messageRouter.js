import express from "express";
import * as messageController from "../controllers/messageController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", messageController.createMessages);
router.get("/:id", messageController.getMessages);

export default router;
