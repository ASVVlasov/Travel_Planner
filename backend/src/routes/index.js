const router = require('express').Router()
const swagger = require("./swagger")
const card = require("./card.js")

router.use('/api-docs', swagger)
router.get('/api-docs', swagger)
router.use('/board/:boardID/:cardType/card/:cardID', function (req, res, next) {
    req.body.boardID = req.params.boardID
    req.body.cardID = req.params.cardID
    req.body.cardType = req.params.cardType
    next()
}, card)


module.exports = router;