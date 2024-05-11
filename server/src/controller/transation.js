const sql = require('../sql');

exports.updateStateTransation = async (id, newState) => {
    const querry = "UPDATE `transaction` SET `state` = ? WHERE (`id` = ?);"
    try {
        result = await sql.query(querry, [newState, id])
        console.log("result", result)
        if (result?.affectedRows == 1) {
            return {
                status: 'ok',
                id: id
            }
        }
    } catch (error) {
        console.log(" -- transation error updateStateTransation", error)
        return { error };
    }
    return -1;
}

exports.getAllTrasaction = async ({ userId, sizePage, page }) => {
    const pageInt = parseInt(page) || 1
    const pageSizePage = parseInt(sizePage) || 10
    const startIndex = (pageInt - 1) * pageSizePage;
    const querry = `SELECT * FROM transaction ${userId ? " where idUserBuller like ? OR iduserSeller like ?" : ""} LIMIT ?, ?;`
    const countQuery = `SELECT COUNT(*) AS total FROM transaction ${userId ? " where idUserBuller like ? OR iduserSeller like ?" : ""};`;

    try {
        countResult = await sql.query(countQuery, userId ? [userId, userId] : [])
        results = await sql.query(querry, userId ? [userId, userId, startIndex, pageSizePage] : [startIndex, pageSizePage])
        const totalItem = countResult[0].total;
        const totalPages = Math.ceil(totalItem / pageSizePage);
        return {
            resultados: results,
            totalItem: totalItem,
            totalPages: totalPages,
            page:pageInt
        }

    } catch (error) {
        console.log(" -- transation error updateStateTransation", error)
        return { error };
    }
}


