import Gig from "../models/gigModel.js";
import { createError } from "../utils/errorHandler.js";

export const createGig = async (req, res, next) => {
	if (!req.isSeller)
		return next(createError(403, "Only sellers can create a gig!"));
	try {
		const newGig = await Gig.create({
			userId: req.userId,
			...req.body,
		});
		res.status(201).json({
			status: "Success",
			message: "New gig created!",
			data: newGig,
		});
	} catch (err) {
		next(createError(400, err));
	}
};

export const getAllGigs = async (req, res, next) => {
	try {
		const query = req.query;
		const filters = {
			...(query.userId && { userId: query.userId }),
			...(query.cat && { cat: query.cat }),
			...(query.search && {
				title: { $regex: query.search, $options: "i" },
			}),
			...((query.min || query.max) && {
				price: {
					...(query.min && { $gt: query.min }),
					...(query.max && { $lt: query.max }),
				},
			}),
		};
		const gigs = await Gig.find(filters).sort({ [query.sort]: -1 });
		if (!gigs) return next(createError(404, "No gigs found"));
		res.status(200).json({
			status: "Success",
			data: gigs,
		});
	} catch (err) {
		next(createError(400, err));
	}
};

export const getGig = async (req, res, next) => {
	try {
		const reqId = req.params.id;
		const gig = await Gig.findById(reqId);
		if (!gig)
			return next(createError(404, "There is no gig with given id!"));
		if (req.userId !== gig.userId)
			return next(createError(403, "You can only see your own gigs!"));
		res.status(200).json({
			status: "Success",
			data: gig,
		});
	} catch (err) {
		next(createError(400, err));
	}
};

export const deleteGig = async (req, res, next) => {
	try {
		const reqId = req.params.id;
		const gig = await Gig.findById(reqId);
		if (req.userId !== gig.userId)
			return next(createError(403, "You can only delete your own gigs!"));
		if (!gig)
			return next(createError(404, "There is no gig with given id!"));

		await gig.delete();
		res.status(200).json({
			status: "Success",
			message: "Document deleted!",
		});
	} catch (err) {
		next(createError(400, err));
	}
};
