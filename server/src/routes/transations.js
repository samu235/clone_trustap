const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const sql = require('../sql');
const { v4: uuidv4 } = require('uuid');

dotenv.config()

router.post('/new', async (req, res) => {
    const {
        idUserBuller,
        idUserSeller,
        price,
        name
    } = req.body;
    const uuid = uuidv4();

    const querry = "INSERT INTO `transaction` (`idUserBuller`, `iduserSeller`, `state`, `price`, `uuid`, `name`) VALUES (?, ?, '1', ?, ? ,?);"
    try {
        result = await sql.query(querry, [idUserBuller, idUserSeller, price, uuid, name])
        if (result?.affectedRows == 1) {
            res.json({
                status: 'ok',
                uuid
            });
            return
        }
    } catch (error) {
        console.log(" -- transation error new", error)
        res.status(400).send({ error });
    }

    res.status(400).send({});
});
module.exports = router;