const router = require('express').Router()
const swagger = require('./swagger')
const cardRouter = require('./card.js')
const travelRouter = require('./travel')
const errorMiddleware = require('../middlewares/error')

router.use('/travel', travelRouter)
router.use('/card', cardRouter)
router.use(errorMiddleware)
router.use('/api-docs', swagger)
router.get('/api-docs', swagger)

module.exports = router
