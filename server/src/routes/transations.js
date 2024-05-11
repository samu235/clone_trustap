const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const sql = require('../sql');
const { v4: uuidv4 } = require('uuid');
const { getAllTrasaction, updateStateTransation } = require('../controller/transation');

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

    res.status(404).send({});
});
router.post('/confirm', async (req, res) => {
    const {
        idUserBuller,
        idUserSeller,
        id
    } = req.body;

    const querry = "UPDATE `transaction` SET `idUserBuller` = ?, `iduserSeller` = ?,`state`=?,`uuid`=? WHERE (`id` = ?);"
    try {
        result = await sql.query(querry, [idUserBuller, idUserSeller, 2, null, id])
        console.log("result", result)
        if (result?.affectedRows == 1) {
            res.json({
                status: 'ok',
                id: id
            });
            return
        }
    } catch (error) {
        console.log(" -- transation error confirm", error)
        res.status(400).send({ error });
    }

    res.status(404).send({});
});

router.get('/getBySlug/:slug', async (req, res) => {
    const slug = req.params.slug;
    const querry = "SELECT * FROM clone_trustap.transaction where uuid =?;"
    try {
        result = await sql.query(querry, [slug])
        if (result?.length == 1 && result?.[0]?.id) {
            res.json(result[0]);
            return
        }
    } catch (error) {
        console.log(" -- transation error getBySlug", error)
        res.status(400).send({ error });
    }

    res.status(400).send({});

});

router.get('/getById/:id', async (req, res) => {
    const id = req.params.id;
    const querry = "SELECT * FROM transaction where id =?;"
    try {
        result = await sql.query(querry, [id])
        if (result?.length == 1 && result?.[0]?.id) {
            res.json(result[0]);
            return
        }
    } catch (error) {
        console.log(" -- transation error getById", error)
        res.status(400).send({ error });
        return
    }

    res.status(400).send({});

});
router.get('/getAll/:page/:sizePage/:userId?', async (req, res) => {
    const { userId, sizePage, page } = req.params;
    try {
        const response = await getAllTrasaction({ userId, sizePage, page })
        console.log(">>> response", response)
        res.json(response);
        return
    } catch (error) {
        console.log(" -- transation error getById", error)
        res.status(400).send({ error });
        return
    }

});

router.post('/sendedItem', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await updateStateTransation(id, 4)
        res.json(result);

    } catch (error) {
        res.status(404).send({});
    }
});
router.post('/delivered', async (req, res) => {
    const { id } = req.body;
    try {
        const result = await updateStateTransation(id, 5)
        res.json(result);

    } catch (error) {
        res.status(404).send({});
    }
});
module.exports = router;