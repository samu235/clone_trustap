'use client';
import { CardElement, Elements, PaymentElement, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`)


const StripeCard = () => {
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret: 'pi_3PF2wgDOCQ9Qt2k92pllY8u4_secret_vuOTCFWs0WttIv3mV4z7KatHk',//TODO llamar a back y poner metodo,
        appearance,
    };

    return <div>
        <Elements options={options} stripe={stripe}>
            {/*<CardElement></CardElement>*/}
            <CheckoutForm />
        </Elements>
    </div>
}
export default StripeCard