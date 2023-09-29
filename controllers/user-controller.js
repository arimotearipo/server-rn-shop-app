const mongoose = require("mongoose");
const UserModel = require("../models/user-model");
const HttpError = require("../shared/HttpError");
const cartController = require("./cart-controller");

const conn = mongoose.connection;

async function getUsers(_req, res, next) {
	try {
		let allUsers = await UserModel.find({}, "-password");
		res.status(200).json({
			users: allUsers.map((user) => user.toObject({ getters: true })),
		});
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function signup(req, res, next) {
	const { fullname, username, password } = req.body;

	try {
		const newUser = new UserModel({
			fullname,
			username,
			password,
		});
		const user = await newUser.save();

		await cartController.createCart(user._id);

		res.status(201).json({
			message: "Sucessfully saved user info to database",
			id: user._id,
		});
	} catch (error) {
		const e = new HttpError(error, 500);
		next(e);
	}
}

async function login(req, res, next) {
	const { username, password } = req.body;

	try {
		const response = await UserModel.findOne(
			{ username, password },
			"-password"
		);

		if (!response) {
			throw new HttpError("User not found", 404);
		}
		res.status(200).json({ data: response });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function deleteAllUsers(_req, res) {
	try {
		await UserModel.deleteMany({});
		res.status(202).json({ message: "Sucessfully deleted all users" });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

async function deleteUser(req, res) {
	const { id } = req.params;

	try {
		await UserModel.deleteOne({ _id: id });
		res.status(202).json({ message: `Sucessfully delete user with id: ${id}` });
	} catch (error) {
		const e = new HttpError(error, 500);
		return next(e);
	}
}

module.exports = {
	getUsers,
	signup,
	login,
	deleteAllUsers,
	deleteUser,
};
