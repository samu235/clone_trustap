
const getTransactionAllService = async ({ 
  userId = null,
  page=1,
  sizePage=10
}) => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}transation/getAll/${page}/${sizePage}/${userId?userId:''}`)
      .then(e => {
        if (!e.ok) {
          return { error: e.status };
        }
        return e.json()
      })
    return result;
  } catch (error) {
    return { error }
  }
}
export default getTransactionAllService