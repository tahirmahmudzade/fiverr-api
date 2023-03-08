import Conversation from "../models/conversationModel.js";
import { createError } from "../utils/errorHandler.js";

export const getConversations = async (req, res, next) => {
	try {
		const conversations = await Conversation.find(
			req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
		);
		if (!conversations)
			return next(
				createError(404, "Could not find or load any conversaion")
			);

		res.status(200).json({ status: "Success", data: conversations });
	} catch (error) {
		return next(createError(400, error));
	}
};
export const getConversation = async (req, res, next) => {
	try {
		const conversation = await Conversation.findById(req.params.id);
		if (!conversation)
			return next(createError(404, "This conversation does not exist"));

		res.status(200).json({
			status: "Success",
			data: conversation,
		});
	} catch (error) {
		return next(createError(400, error));
	}
};
export const createConversations = async (req, res, next) => {
	try {
		const newConversation = await Conversation.create({
			sellerId: req.isSeller ? req.userId : req.body.to,
			buyerId: req.isSeller ? req.body.to : req.userId,
			readBySeller: req.isSeller,
			readByBuyer: !req.isSeller,
		});

		if (newConversation.buyerId === newConversation.sellerId)
			return next(
				createError(400, "An error occurred... Please try again")
			);
		res.status(200).json({ status: "Success", data: newConversation });
	} catch (error) {
		return next(createError(400, error));
	}
};
export const updateConversations = async (req, res, next) => {
	try {
		const updateConversation = await Conversation.findByIdAndUpdate(
			req.params.id,
			{ $set: { readBySeller: req.isSeller, readByBuyer: !req.isSeller } }
		);
		if (!updateConversation)
			return next(createError(400, "This conversation does not exist"));
		res.status(200).json({
			status: "Success",
			updated: updateConversation,
		});
	} catch (error) {
		return next(createError(400, error));
	}
};
