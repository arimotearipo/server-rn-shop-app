const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItemsSchema = new Schema({
	productId: { type: mongoose.Types.ObjectId, required: true },
	quantity: { type: Number, required: true },
});

const userSchema = new Schema({
	fullname: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	cartItems: { type: [cartItemsSchema], default: [] },
});

module.exports = mongoose.model("UserModel", userSchema);
