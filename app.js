require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./router/user-route");
const productRoutes = require("./router/product-route");
const cartRoutes = require("./router/cart-route");
const errorHandler = require("./middleware/error-handler");

const app = express();

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@rn-shop-app.oo1tbl3.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use(errorHandler);

mongoose.connect(connectionString);

const db = mongoose.connection;
db.on("error", (err) => {
	console.error("Error when trying to connect to database", err);
});
db.once("open", () => console.log("Database connected"));

app.listen(3000, () => console.log("Server has started"));
