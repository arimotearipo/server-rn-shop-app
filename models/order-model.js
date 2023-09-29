const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
	userId: mongoose.Types.ObjectId,
});
