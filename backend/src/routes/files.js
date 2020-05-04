const path = require('path')
const express = require('express')
const router = express.Router()
const fileUpload = require(path.resolve(
   __dirname,
   '..',
   'controllers',
   'file',
   'upload'
))
router.post('/upload', fileUpload)
router.use('/', express.static(path.resolve(__dirname, '..', 'uploads')))
module.exports = router
