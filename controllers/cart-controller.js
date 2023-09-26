const CartModel = require("../models/cart-model");
const HttpError = require("../shared/HttpError");

async function createCart(req, res, next) {
	const { cartItems } = req.body;
	const { userId } = req.params;

	const newCart = new CartModel({
		userId,
		cartItems,
	});

	try {
		await newCart.save();
		res
			.status(201)
			.json({ message: `Successfully created cart for userId: ${userId}` });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function getCart(req, res, next) {
	const { userId } = req.params;

	try {
		const { cartItems } = await CartModel.findOne({ userId });

		const productCount = await cartItems.reduce(
			(total, cur) => total + cur.quantity,
			0
		);

		res.status(200).json({
			data: cartItems,
			uniqueProductCount: cartItems.length,
			productCount,
		});
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function updateCart(req, res, next) {
	const { cartItems } = req.body;
	const { userId } = req.params;

	try {
		await CartModel.findOneAndUpdate({ userId }, { cartItems });
		res
			.status(201)
			.json({ message: `Sucessfully updated cart for user: ${userId}` });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

module.exports = {
	getCart,
	createCart,
	updateCart,
};
