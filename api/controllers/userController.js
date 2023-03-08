import { createError } from "../utils/errorHandler.js";
import User from "../models/userModel.js";

export const getUser = async (req, res, next) => {
	try {
		const id = req.params.id;

		const user = await User.findById(id);
		if (req.userId !== user._id)
			return next(createError(403, "You are not authorized to do this"));
		if (!user) return next(createError(404, "User not found!"));

		res.status(201).json({
			status: "Success",
			data: user,
		});
	} catch (err) {
		return next(createError(400, err));
	}
};

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		if (!users) return next(createError(404, "Not found"));

		res.status(200).json({ status: "Fail", data: users });
	} catch (err) {
		return next(createError(400, err));
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;

		const user = await User.findById(id);
		if (!user) return next(createError(404, "No user found by given id!"));

		if (req.userId !== user._id)
			return next(
				createError(400, "You can only delete your own account!")
			);

		await User.findByIdAndDelete(id);
		res.status(200).json({
			status: "Success",
			message: "User deleted!",
		});
	} catch (err) {
		return next(createError(400, err));
	}
};
