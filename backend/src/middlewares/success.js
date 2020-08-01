const successMiddleware = (req, res, next) => {
   res.json({
      message: '',
      type: '',
      data: req.data,
   })
   next()
}
module.exports = successMiddleware
