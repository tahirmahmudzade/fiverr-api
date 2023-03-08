import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: String,
			unique: true,
			required: true,
		},
		userId: {
			type: String,
			unique: true,
			required: true,
		},
		content: {
			type: String,
			required: true,
			default: "",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Message", messageSchema);
