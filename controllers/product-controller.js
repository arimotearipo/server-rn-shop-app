const ProductModel = require("../models/product-model");
const HttpError = require("../shared/HttpError");

async function getAllProducts(_req, res, next) {
	try {
		const response = await ProductModel.find({});
		res.status(200).json({ data: response, count: response.length });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function getProduct(req, res, next) {
	const { id } = req.params;

	try {
		const response = await ProductModel.findById(id);
		res.status(200).json({ data: response });
	} catch (error) {
		const e = new HttpError(error, 500);
		next(e);
	}
}

async function addProduct(req, res, next) {
	const { name, price, description } = req.body;

	try {
		const product = await ProductModel.create({
			name,
			price,
			description,
		});

		res
			.status(201)
			.json({ message: "Sucessfully saved item to database", data: product });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function deleteProduct(req, res, next) {
	const { id } = req.params;

	try {
		const product = await ProductModel.findByIdAndDelete(id);

		res
			.status(202)
			.json({ message: "Sucessfully deleted item in database", data: product });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function updateProduct(req, res, next) {
	const { id } = req.params;

	try {
		await ProductModel.findByIdAndUpdate(id, req.body);
		res
			.status(201)
			.json({ message: `Successfully updated product with id: ${id}` });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

module.exports = {
	addProduct,
	deleteProduct,
	getAllProducts,
	updateProduct,
	getProduct,
};
