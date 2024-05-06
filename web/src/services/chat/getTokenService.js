
const getTokenService = async user =>{
    const token = await fetch(`${process.env.NEXT_PUBLIC_API_URL}chat/getTocken/${user}`).then(e => e.json());
    return(token)
}

export default getTokenService