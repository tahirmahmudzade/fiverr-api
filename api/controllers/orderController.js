import Order from "../models/orderModel.js";
import Gig from "../models/gigModel.js";
import { createError } from "../utils/errorHandler.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
	const stripe = new Stripe(
		"sk_test_51MSGdwLeJOwhHgksIeaV8yMEROSnrJiZGLt4MUTaq7TVSLKdZ1fnyNF51bErIqfXotAtbEpwrVseQFqHGiLDxWNv00x9aO42zp"
	);

	try {
		if (req.isSeller)
			return next(createError(400, "Sellers can not order!"));

		const gig = await Gig.findById(req.params.id);
		if (!gig)
			return next(createError(404, "Could not find gig with given id"));

		const paymentIntent = await stripe.paymentIntents.create({
			amount: gig.price * 100,
			currency: "usd",
			automatic_payment_methods: {
				enabled: true,
			},
		});

		const newOrder = await Order.create({
			price: gig.price,
			gigId: gig.id,
			title: gig.title,
			img: gig.images[0],
			payment_intent: paymentIntent.id,
			sellerId: gig.userId,
			buyerId: req.userId,
			isCompleted: true,
		});
		res.status(200).json({
			status: "Success",
			data: newOrder,
			clientSecret: paymentIntent.client_secret,
		});

		req.payment_intent = paymentIntent.id;
	} catch (error) {
		return next(createError(400, error));
	}
};

export const getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({
			...(req.isSeller
				? { sellerId: req.userId }
				: { buyerId: req.userId }),
			isCompleted: true,
		});

		if (!orders)
			return next(
				createError(404, "Couldn't find or load orders with given id")
			);

		res.status(200).json({ status: "Success", data: orders });
	} catch (error) {
		return next(createError(400, error));
	}
};

export const confirm = async (req, res, next) => {
	try {
		const order = await Order.findOneAndUpdate(
			{ payment_intent: req.paymentIntent },
			{
				$set: { isCompleted: true },
			}
		);

		res.status(200).json({
			status: "Success",
			message: "Order confirmed!",
			data: order,
		});
		req.paymentIntent = null;
	} catch (err) {
		return next(createError(400, error));
	}
};
