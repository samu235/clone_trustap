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
            idTransaction: idTransaction,
        },

    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});


const newAccount = async () => {
    const account = await stripe.accounts.create({
        controller: {
            losses: {
                payments: 'application',
            },
            fees: {
                payer: 'application',
            },
            stripe_dashboard: {
                type: 'express',
            },
        },
    });
    return account
}

router.post("/create-client", async (req, res) => {
    const { idTransaction } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const acount = await newAccount()
    console.log("cuanta >> ", acount)
    const accountLink = await stripe.accountLinks.create({
        account: acount?.id,
        refresh_url: 'https://example.com/reauth',
        return_url: 'https://example.com/return',
        type: 'account_onboarding',
    });
    console.log("accountLink >> ", accountLink)



    res.send({
        // clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router;