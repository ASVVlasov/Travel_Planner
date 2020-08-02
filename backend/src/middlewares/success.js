const successMiddleware = (req, res) => {
   res.json({
      message: req.message,
      type: req.type,
      data: req.data,
   })
}
module.exports = successMiddleware
