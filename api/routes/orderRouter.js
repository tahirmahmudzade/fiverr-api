import express from "express";
import * as orderController from "../controllers/orderController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.use(verifyToken);
router.get("/", orderController.getOrders);
router.post("/create-payment-intent/:id", orderController.intent);
router.put("/", orderController.confirm);
export default router;
