
const newTransactionService = ({
  idUserBuller = null,
  idUserSeller = null,
  price,
  name
}) => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}transation/new`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUserBuller,
        idUserSeller,
        price,
        name
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
export default newTransactionService