
const sendenItemTransactionService = async (
  id
) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}transation/sendedItem`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la petición sendenItemTransactionService');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
export default sendenItemTransactionService