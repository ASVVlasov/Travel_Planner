const router = require('express').Router()
const swagger = require("./swagger")
const card = require("./card.js")

router.use('/api-docs', swagger)
router.get('/api-docs', swagger)
router.use('/board/:boardID/:cardType/card/:cardID', card)
router.get('/board/:boardID/:cardType/card/:cardID', card)

module.exports = router;