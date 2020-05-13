const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3300

mongoose.connect('mongodb+srv://gt_root:greenteam@cluster0-jubqy.azure.mongodb.net/dev_travel_planer?retryWrites=true&w=majority', {
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
   .use(fileUpload({ createParentPath: true }))
   .use(cors())
   .use('/', express.static(path.resolve(__dirname, '..', '..', 'frontend', 'build')))
   .use(router)
   .listen(PORT, () => {
      console.log(`server has been started at http://localhost:${PORT}`)
   })
