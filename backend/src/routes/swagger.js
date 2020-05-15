const swaggerUi = require('swagger-ui-express')
const router = require('express').Router()

const document = require('../docs/index.js')
router.use('/', swaggerUi.serve, swaggerUi.setup(document))

module.exports = router
