import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "A user must have a username!"],
		},
		email: {
			type: String,
			unique: true,
			required: [true, "A user must have an email!"],
		},
		password: {
			type: String,
			required: [true, "A user must have a password!"],
		},
		img: String,

		country: String,

		phone: String,

		description: String,

		isSeller: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};
export default mongoose.model("User", userSchema);
