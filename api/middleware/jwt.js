import jwt from "jsonwebtoken";
import { createError } from "../utils/errorHandler.js";

export const verifyToken = (req, res, next) => {
	const token = req.cookies.accessToken;
	if (!token)
		return next(
			createError(401, "You are not authorized to make this happen")
		);
	jwt.verify(token, process.env.JWT_KEY, (err, pay) => {
		if (err) return next(createError(403, "Token is not valid!"));

		req.userId = pay.id;
		req.isSeller = pay.isSeller;
		next();
	});
};
