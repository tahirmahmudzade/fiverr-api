import User from "../models/userModel.js";
import { createError } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
	try {
		const username = req.body.username;
		const candidatePassword = req.body.password;

		const user = await User.findOne({ username });

		if (!user) return next(createError(404, "Wrong username or password!"));
		if (!user.correctPassword(candidatePassword, user.password))
			return next(createError(400, "Wrong username or password!"));

		const token = jwt.sign(
			{ id: user._id, isSeller: user.isSeller },
			process.env.JWT_KEY
		);

		res.cookie("accessToken", token, {
			httpOnly: true,
		})
			.status(200)
			.json({
				status: "Success",
				message: `Welcome ${username}`,
				data: user,
			});
	} catch (err) {
		return next(createError(400, err));
		console.log(err);
	}
};

export const logout = async (req, res, next) => {
	try {
		res.clearCookie("accessToken", {
			sameSite: "none",
			secure: true,
		})
			.status(200)
			.json({ status: "Success", message: "User has been logged out" });
	} catch (err) {
		return next(createError(400, err));
	}
};

export const register = async (req, res, next) => {
	try {
		const newUser = await User.create({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			isSeller: Boolean(req.body.isSeller),
		});
		res.status(200).json({
			status: "Success",
			data: newUser,
		});
	} catch (err) {
		next(err);
	}
};
