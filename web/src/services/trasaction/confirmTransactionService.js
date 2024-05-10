
const confirmTransactionService = async({
  idUserBuller,
  idUserSeller,
  id
}) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}transation/confirm`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idUserBuller,
        idUserSeller,
        id
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición confirmTransactionService');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
export default confirmTransactionService