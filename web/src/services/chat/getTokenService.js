
const getTokenService = async user =>{
    const token = await fetch(`http://localhost:3001/chat/getTocken/${user}`).then(e => e.json());
    return(token)
}

export default getTokenService