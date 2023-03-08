import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		gigId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		star: {
			type: String,
			enum: [1, 2, 3, 4, 5],
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
