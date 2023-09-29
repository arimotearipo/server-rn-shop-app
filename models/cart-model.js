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

const cartSchema = new Schema({
	user: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
	cartItems: { type: [cartItemsSchema], default: [] },
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
