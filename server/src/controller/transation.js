const sql = require('../sql');

exports.updateStateTransation = async (id, newState) =>  {
    const querry = "UPDATE `transaction` SET `state` = ? WHERE (`id` = ?);"
    try {
        result = await sql.query(querry, [newState, id])
        console.log("result",result)
        if (result?.affectedRows == 1) {
            return{
                status: 'ok',
                id: id
            }
        }
    } catch (error) {
        console.log(" -- transation error updateStateTransation", error)
       return{ error };
    }
    return -1;
}


