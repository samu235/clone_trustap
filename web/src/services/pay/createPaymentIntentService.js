//create-payment-intent

const createPaymentIntentService = async (idTransaction) =>{
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}pay/create-payment-intent`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idTransaction
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición.');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
export default createPaymentIntentService