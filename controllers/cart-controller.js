const CartModel = require("../models/cart-model");
const HttpError = require("../shared/HttpError");

async function getCart(req, res, next) {
	const { userId } = req.params;

	try {
		const { cartItems } = await CartModel.findOne({ user: userId })
			.populate({
				path: "cartItems.product",
				select: ["_id", "name", "price", "description"],
			})
			.lean();

		const mappedCartItems = cartItems.map((item) => {
			return {
				...item.product,
				quantity: item.quantity,
			};
		});

		const productCount = mappedCartItems.reduce(
			(total, cur) => total + cur.quantity,
			0
		);

		const totalAmount = mappedCartItems.reduce(
			(total, cur) => total + cur.price * cur.quantity,
			0
		);

		res.status(200).json({
			line_items: mappedCartItems,
			uniqueProductCount: mappedCartItems.length,
			productCount,
			totalAmount,
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
		await CartModel.findOneAndUpdate({ user: userId }, { cartItems });
		res
			.status(201)
			.json({ message: `Sucessfully updated cart for user: ${userId}` });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function createCart(userId, session) {
	try {
		const cartItem = new CartModel({
			user: userId,
		});

		await cartItem.save({ session });
	} catch (error) {
		const e = new HttpError(error);
		return next(e);
	}
}

module.exports = {
	getCart,
	updateCart,
	createCart,
};
