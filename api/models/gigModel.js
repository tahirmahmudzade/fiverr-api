import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		totalStars: {
			type: Number,
			required: true,
		},
		starNumber: {
			type: Number,
			required: true,
		},
		cat: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		cover: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
			required: true,
		},
		summary: {
			type: String,
			required: true,
		},
		deliveryTime: {
			type: Number,
			required: true,
		},
		revisionNumber: {
			type: Number,
			required: true,
		},
		features: {
			type: [String],
			required: true,
		},
		sales: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Gig", gigSchema);
