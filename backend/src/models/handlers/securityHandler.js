const SecurityHandler = function (doc, next) {
   if (!!doc) {
      delete doc.password
   }
   next()
}

module.exports = SecurityHandler
