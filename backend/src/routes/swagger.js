const swaggerUi = require('swagger-ui-express')
const router = require('express').Router()

const document = require("../swagger/definition.js")
document.components = {}
document.components.schemas = require("../swagger/schemas.js")
router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(document))

module.exports = router