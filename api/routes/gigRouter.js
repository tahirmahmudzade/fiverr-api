import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import * as gigController from "../controllers/gigController.js";

const router = express.Router();

router.get("/", gigController.getAllGigs).get("/:id", gigController.getGig);

router.use(verifyToken);

router.post("/", gigController.createGig);

router.delete("/:id", gigController.deleteGig);

export default router;
