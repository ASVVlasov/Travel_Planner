const successMiddleware = (req, res) => {
   res.json({
      message: req.message,
      type: 'success',
      data: req.data,
   })
}
module.exports = successMiddleware
