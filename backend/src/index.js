const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3300

mongoose.connect(process.env.DB_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
})
mongoose.connection
   .on('error', () => {
      console.log('error connection')
   })
   .once('open', () => {
      console.log('DB connected')
   })

const router = require(path.resolve(__dirname, '.', 'routes'))
app.use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use(cors())
   .use('/', express.static(path.resolve(__dirname, '..', '..', 'frontend', 'build')))
   .use(router)
   .listen(PORT, () => {
      console.log(`server has been started at http://localhost:${PORT}`)
   })
