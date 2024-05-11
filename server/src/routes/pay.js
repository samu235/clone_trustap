const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config()
const STRIPE_SECRET = process.env.STRIPE_SECRET;
const stripe = require("stripe")(STRIPE_SECRET);



// se tendria que comprobar si el usuario existe y si esta logado con un middelware, pero no vamos a hacer sobre ingenieria y esto es un ejemplo
router.post("/create-payment-intent", async (req, res) => {
    //const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1500,
        currency: "eur",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        payment_method_types: ['card'],
        metadata: {
            order_id: '6735',
        },

    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});
const endpointSecret = 'whsec_b087cb58c6662a75cde4fd35317ca6f4f3a81c79571661b18b572bde19f83aca'
router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  });
module.exports = router;