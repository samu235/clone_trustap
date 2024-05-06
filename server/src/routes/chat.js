const express = require('express');
const router = express.Router();
const StreamChat = require('stream-chat').StreamChat;
const dotenv = require('dotenv');

dotenv.config()

const CHAT_SECRET = process.env.CHAT_SECRET;
const CHAT_KEY = process.env.CHAT_KEY;

const serverClient = StreamChat.getInstance(CHAT_KEY, CHAT_SECRET)
// se tendria que comprobar si el usuario existe y si esta logado con un middelware, pero no vamos a hacer sobre ingenieria y esto es un ejemplo
router.get('/getTocken/:user', (req, res) => {
  const user = req.params.user;
  console.log(">>>user",user)

  try {
    const token = serverClient.createToken(user)
    res.json(token)
  } catch (error) {
    console.log("createIdSesion -- error", error)
    res.status(400).send({ error });
  }

});

module.exports = router;
