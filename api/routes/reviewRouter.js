import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/jwt.js";
const router = express.Router();

router.use(verifyToken);

router.post("/", reviewController.createReview);

router
	.route("/:gigId")
	.get(reviewController.getReviews)
	.delete(reviewController.deleteReview);

export default router;
