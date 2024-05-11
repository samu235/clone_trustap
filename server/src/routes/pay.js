const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config()
const STRIPE_SECRET = process.env.STRIPE_SECRET;
const stripe = require("stripe")(STRIPE_SECRET);



// se tendria que comprobar si el usuario existe y si esta logado con un middelware, pero no vamos a hacer sobre ingenieria y esto es un ejemplo
router.post("/create-payment-intent", async (req, res) => {
    const { idTransaction } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1500,
        currency: "eur",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        payment_method_types: ['card'],
        metadata: {
            idTransaction:idTransaction ,
        },

    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router;