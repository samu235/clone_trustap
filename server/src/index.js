const express = require('express');
const cors = require('cors');
const chatRouter = require('./routes/chat');
const transationRouter = require('./routes/transations');
const dotenv = require('dotenv');
const resultdotenv = dotenv.config()

if (resultdotenv.error) {
    console.log("sin archivo .env en el servidor")
    throw resultdotenv.error
}

const app = express();
app.use(cors());

//app.use(loggerMiddleware);
app.use(express.json());
app.use('/chat',chatRouter)
app.use('/transation',transationRouter)

//app.use(errorHandlerMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
