const router = require('express').Router()
const swagger = require('./swagger')
const cardRouter = require('./card')
const travelRouter = require('./travel')
const userRouter = require('./user')
const errorMiddleware = require('../middlewares/error')
const authenticateMiddleware = require('../middlewares/authentication')

const auth = require('./auth/signin')
const register = require('./auth/signup')
const logout = require('./auth/logout')

router.use('/signup', register)
router.use('/signin', auth)
router.use(authenticateMiddleware)
router.use('/travel', travelRouter)
router.use('/card', cardRouter)
router.use('/user', userRouter)
router.use('/logout', logout)
router.use(errorMiddleware)
router.use('/api-docs', swagger)
router.get('/api-docs', swagger)

module.exports = router
