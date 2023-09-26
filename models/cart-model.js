const mongoose = require("mongoose");
const productModel = require("./product-model");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
	userId: { type: String, required: true },
	cartItems: { type: Array, default: [] },
});

module.exports = mongoose.model("CartModel", cartSchema);
