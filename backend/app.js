const express = require('express')
const cors = require('cors')
const { config } = require('dotenv')
const { db } = require('./db/db');
const app = express()
require ('dotenv').config()

const PORT = process.env.PORT

// MIDDLEWARES
app.use(express.json())
app.use(cors({}))



const server = () => {
    db()
    app.listen(PORT, () => {
        console.log("listening to port:", PORT)
    })
}

server()