const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItemsSchema = new Schema({
	product: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: "Product",
	},
	quantity: { type: Number, required: true },
});

const userSchema = new Schema({
	fullname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	cartItems: { type: [cartItemsSchema], default: [] },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
