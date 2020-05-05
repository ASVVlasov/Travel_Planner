const router = require('express').Router()
const swagger = require('./swagger')
const files = require('./files')

router.use('/cards', files)
router.use('/api-docs', swagger)
router.get('/api-docs', swagger)

module.exports = router
