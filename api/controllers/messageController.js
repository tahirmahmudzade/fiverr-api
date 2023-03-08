import Messages from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
import { createError } from "../utils/errorHandler.js";

export const getMessages = async (req, res, next) => {
	try {
		const messages = await Messages.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json({ status: "Success", data: messages });
	} catch (error) {
		return next(createError(400, error));
	}
};

export const createMessages = async (req, res, next) => {
	try {
		console.log(req.conversationId);
		const newMessage = await Messages.create({
			conversationId: req.body.conversationId,
			userId: req.userId,
			content: req.body.desc,
		});
		await Conversation.findByIdAndUpdate(
			req.body.conversationId,
			{
				$set: {
					readBySeller: req.isSeller,
					readByBuyer: !req.isSeller,
					lastMessage: req.body.desc,
				},
			},
			{ new: true }
		);
		res.status(200).json({ status: "Success", data: newMessage });
	} catch (error) {
		return next(createError(400, error));
	}
};
