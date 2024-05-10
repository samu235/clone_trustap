
const getTransactionBySlugService = async (slug) => {
  try {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}transation/getBySlug/${slug}`)
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
export default getTransactionBySlugService