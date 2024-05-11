'use client';
import { CardElement, Elements, PaymentElement, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm";

const stripe = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`)


const StripeCard = ({clientSecret,close,idTrasaction}) => {
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret: clientSecret,//TODO llamar a back y poner metodo,
        appearance,
    };

    return <div>
        <Elements options={options} stripe={stripe}>
            {/*<CardElement></CardElement>*/}
            <CheckoutForm close={close} idTrasaction={idTrasaction}/>
        </Elements>
    </div>
}
export default StripeCard