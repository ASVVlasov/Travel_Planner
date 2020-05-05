const path = require('path')
const express = require('express')
const router = express.Router()
const attachments = require(path.resolve(
   __dirname,
   '..',
   'controllers',
   'card',
   'attachment'
))
router.post('/attachFile', attachments.attach)
router.post('/deattachFile', attachments.deattach)
router.use('/', express.static(path.resolve(__dirname, '..', 'uploads')))
module.exports = router
