require('dotenv').config()
const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const usersRouter = require('./src/routers/users.router')
const placasRouter = require('./src/routers/placas.router')
const adminRouter = require('./src/routers/admin.router')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/gasoline'
console.log(MONGO_URL)
const PORT = process.env.PORT || 4040

const app = express()

app.use(bodyParser.json())

app.use('/users', usersRouter)
app.use('/placa', placasRouter)
app.use("/admin", adminRouter)

app.get('/', (req, res) => res.send('Hello World!'))

const run = async () => {
  mongoose.connect(MONGO_URL, {
    // autoIndex: false, // Don't build indexes
    // maxPoolSize: 30, // Maintain up to 30 socket connections
    // serverSelectionTimeoutMS: 15000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // family: 4, // Use IPv4, skip trying IPv6
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to database " + MONGO_URL);
  });

  // On Error
  mongoose.connection.on("error", (err) => {
    console.log("Database error" + err);
  });

  await app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
  })
}

run()
