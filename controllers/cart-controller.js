const UserModel = require("../models/user-model");
const HttpError = require("../shared/HttpError");

async function getCart(req, res, next) {
	const { userId } = req.params;

	try {
		const { cartItems } = await UserModel.findOne({ _id: userId });

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
		await UserModel.findOneAndUpdate({ _id: userId }, { cartItems });
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
	updateCart,
};
