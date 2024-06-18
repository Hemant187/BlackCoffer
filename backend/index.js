const express = require('express');
const app = express()
require('dotenv').config({path: './config/.env'})
const Data = require('./model/Data.model')
//connect mongoDb
const connectDB = require('./config/database')
connectDB()

//upload json data on mongoDb
// Data.collection.insertMany()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/data', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let data = await Data.find({}).limit(req.query.limit || 10)
  console.log(data.length)
  res.send(data)
})

app.listen(process.env.PORT, () => {
  console.log(`Server in running on ${process.env.PORT} port`)
})