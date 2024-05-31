require('dotenv').config();
const connectToMongo= require("./db");
const express = require('express')
connectToMongo();

const app = express()
const port = 5000
//If you want to use request.body then you will need a middleware
app.use(express.json());

//Available Routes
app.use('/app/auth',  require('./routes/auth'));
app.use('/app/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})