const StatusHandler = function (doc, next) {
   const today = Date.now()
   if (Date.parse(doc.endDate) < today) {
      doc.status = travelStatuses.ARCHIVE
      doc.save()
   }
   next()
}

module.exports = StatusHandler
