import Review from "../models/reviewModel.js";
import { createError } from "../utils/errorHandler.js";
import Gig from "../models/gigModel.js";

export const getReviews = async (req, res, next) => {
	try {
		const reviews = await Review.findOne({ gigId: req.params.gigId });
		if (!reviews) return next(createError(404, "Not found"));

		res.status(200).json({
			status: "Success",
			data: reviews,
		});
	} catch (err) {
		return next(createError(400, err));
	}
};

export const createReview = async (req, res, next) => {
	if (req.isSeller)
		return createError(400, "Sellers can not create a review!");
	console.log(req.body);
	try {
		const review = await Review.findOne({
			gigId: req.body.gigId,
			userId: req.userId,
		});
		if (review)
			return createError(401, "You already have a review on this gig!");

		const newReview = await Review.create({
			userId: req.userId,
			...req.body,
		});

		await Gig.findByIdAndUpdate(req.body.gigId, {
			$inc: { totalStars: req.body.star, starNumber: 1 },
		});

		res.status(200).json({
			status: "Success",
			data: newReview,
		});
	} catch (err) {
		console.log(err);
	}
};

export const deleteReview = async (req, res, next) => {
	try {
		if (req.isSeller)
			return next(createError(403, "Seller can not delete reviews!"));
		const review = await Review.findById(req.params.id);
		if (req.userId !== review.userId)
			return next(
				createError(403, "You can only delete your own review!")
			);

		await Review.findByIdAndDelete(req.params.id);

		res.status(200).json({ status: "Success", message: "Review deleted!" });
	} catch (err) {
		return next(createError(400, err));
	}
};
