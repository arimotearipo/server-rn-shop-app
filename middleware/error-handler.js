function errorHandler(error, req, res, next) {
	res.header("Content-Type", "application/json");

	const status = error.status || 400;

	console.error(error);
	res.status(status).send({ message: error.message });
}

module.exports = errorHandler;
