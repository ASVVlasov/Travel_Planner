const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const forgotRouter = require('./forgot')
const signinRouter = require('./signin')
const signupRouter = require('./signup')
const logoutRouter = require('./logout')

router.use('/signin', signinRouter)
router.use('/signup', signupRouter)
router.use('/forgot', forgotRouter)
router.use('/logout', logoutRouter)

module.exports = router
