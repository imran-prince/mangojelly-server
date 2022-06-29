const express = require('express')
const app = express()
const cors = require('cors')
 
 
app.use(cors({
  origin: true,
  optionsSuccessStatus: 200,
  credentials: true,
}))
app.use(express.json())
require('dotenv').config()
const port = process.env.PORT || 5000

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.get('/', (req, res) => {
    res.send('Welcome to mango jelly ')
  })
  
  app.listen(port, () => {
    console.log(`Welcome to  port ${port}`)
  })