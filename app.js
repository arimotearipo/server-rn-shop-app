require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./router/user-route");
const productRoutes = require("./router/product-route");
const cartRoutes = require("./router/cart-route");
const orderRoutes = require("./router/order-route");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use(errorHandler);

mongoose.connect(process.env.DB_CONNECTION);

const db = mongoose.connection;
db.on("error", (err) => {
	console.error("Error when trying to connect to database", err);
});
db.once("open", () => console.log("Database connected"));

app.listen(process.env.PORT_NUMBER, () =>
	console.log(`Server has started on port ${process.env.PORT_NUMBER}`)
);
