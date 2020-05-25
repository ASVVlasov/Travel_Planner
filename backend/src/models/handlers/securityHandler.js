const SecurityHandler = function (doc, next) {
   if (!!doc) {
      doc.set('password', undefined, { strict: false })
   }
   next()
}

module.exports = SecurityHandler
