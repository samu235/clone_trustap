
import Button from '@/components/ui/Button';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import style from './style.module.css'
import { useState } from 'react';
const CheckoutForm = ({close,idTrasaction}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error,setError]= useState(null)
  const handleClose = event=>{
    event.preventDefault();
    close?.()
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/transaction/${idTrasaction}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      setError(result.error.message)
      
    } else {
      setError(null)
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <p>{error}</p>
      <div className={style.container_btn}>
        <Button className={style.red} onClick={handleClose}>cerrar</Button>
        <Button disabled={!stripe} className={style.green}>Enviar</Button>
      </div>

    </form>
  )
};

export default CheckoutForm;