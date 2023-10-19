const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

async function payment(req, res) {
	const customer = await stripe.customers.create();
	const ephemeralKey = await stripe.ephemeralKeys.create(
		{ customer: customer.id },
		{ apiVersion: "2022-11-15" }
	);
	const paymentIntent = await stripe.paymentIntents.create({
		amount: 1099,
		currency: "myr",
		customer: customer.id,
		// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
		payment_method_types: ["fpx", "card", "grabpay"],
	});

	console.log(paymentIntent);

	res.json({
		paymentIntent: paymentIntent.client_secret,
		ephemeralKey: ephemeralKey.secret,
		customer: customer.id,
		publishableKey:
			"pk_test_51MNIH9I6DzLO0fdc0vEAwQ3QvyOe02Oi10eowr4HUyR6PaiNeLo6JHQ5BybERfP0KsYpTeqPQO7RbACcftKIwhs1008i2OrOpB",
	});
}

module.exports = {
	payment,
};
