import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRouter.js";
import reviewRoutes from "./routes/reviewRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import orderRoutes from "./routes/orderRouter.js";
import gigRoutes from "./routes/gigRouter.js";
import authRoutes from "./routes/authRouter.js";
import conversationRoutes from "./routes/conversationRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong!";

	res.status(errorStatus).json({ status: "Fail", message: errorMessage });
});

export default app;
