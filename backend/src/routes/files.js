const path = require('path')
const express = require('express')
const router = express.Router()
const attachments = require(path.resolve(__dirname, '..', 'controllers', 'card', 'attachment'))

router.post('/attachFile', (req, res) => {
   res.json(attachments.attach(req))
})
router.post('/deattachFile', (req, res) => {
   res.json(attachments.deattach(req))
})
router.use('/', express.static(path.resolve(__dirname, '..', 'uploads')))
module.exports = router
