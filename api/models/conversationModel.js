import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
	{
		sellerId: {
			type: String,
			required: true,
		},
		buyerId: {
			type: String,
			required: true,
		},
		readBySeller: {
			type: Boolean,
		},
		readByBuyer: {
			type: Boolean,
		},
		lastMessage: String,
	},
	{ timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
