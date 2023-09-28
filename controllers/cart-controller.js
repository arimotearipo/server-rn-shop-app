const UserModel = require("../models/user-model");
const HttpError = require("../shared/HttpError");

async function getCart(req, res, next) {
	const { userId } = req.params;

	try {
		const { cartItems } = await UserModel.findOne({ _id: userId })
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

		res.status(200).json({
			data: mappedCartItems,
			uniqueProductCount: mappedCartItems.length,
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

const item = {
	product: {
		_id: "651480b874adbad2ffef4345",
		name: "Laptop",
		price: 2900,
		description: "Do your work on it",
		__v: 0,
		quantity: 1,
	},
};
