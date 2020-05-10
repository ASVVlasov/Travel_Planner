const router = require('express').Router()
const swagger = require('./swagger')
const cardRouter = require('./card.js')
const travelRouter = require('./travel')

// TODO получение сущностей по текущему userId, после авторизации у нас юзер всегда будет доступен в req.user поэтому
//  userId текущего не передаем

router.use('/travel', travelRouter)
router.use('/card', cardRouter)
router.use('/api-docs', swagger)
router.get('/api-docs', swagger)

module.exports = router
