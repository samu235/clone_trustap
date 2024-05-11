const express = require('express');
const cors = require('cors');
const chatRouter = require('./routes/chat');
const transationRouter = require('./routes/transations');
const webhookRouter = require('./routes/webhook')
const payRouter = require('./routes/pay');
const dotenv = require('dotenv');
const resultdotenv = dotenv.config()

if (resultdotenv.error) {
    console.log("sin archivo .env en el servidor")
    throw resultdotenv.error
}

const app = express();
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

//app.use(loggerMiddleware);
app.use('/webhook',webhookRouter)
app.use(express.json());
app.use('/chat',chatRouter)
app.use('/transation',transationRouter)
app.use('/pay',payRouter)

//app.use(errorHandlerMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
