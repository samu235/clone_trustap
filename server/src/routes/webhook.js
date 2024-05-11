const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { updateStateTransation } = require('../controller/transation');

dotenv.config()
const STRIPE_END_POINT_SECRET = process.env.STRIPE_END_POINT_SECRET;
const STRIPE_SECRET = process.env.STRIPE_SECRET;
const stripe = require("stripe")(STRIPE_SECRET);

router.post('/', express.raw({ type: 'application/json' }), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (STRIPE_END_POINT_SECRET) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        STRIPE_END_POINT_SECRET
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
      const idTransaction = event?.data?.object?.metadata?.idTransaction;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      if(idTransaction)updateStateTransation(idTransaction,3)
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