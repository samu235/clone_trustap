
const getTransactionByIdService = async (id) => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}transation/getById/${id}`)
    .then(e=>{
      if (!e.ok) {
       return {error:e.status} ;
      }
      return e.json()
    })
    return result;
  } catch (error) {
    return { error }
  }
}
export default getTransactionByIdService