const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000

mongoose.connect(
   'mongodb+srv://gt_root:greenteam@cluster0-jubqy.azure.mongodb.net/test?retryWrites=true&w=majority',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
   }
)
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
   .use(fileUpload({ createParentPath: true }))
   .use(
      '/',
      express.static(path.resolve(__dirname, '..', '..', 'frontend', 'build'))
   )
   .use(router)
   .listen(PORT, () => {
      console.log(`server has been started at http://localhost:${PORT}`)
   })
