const travelStatuses = require('../types/enumTravelStatuses.js')

const StatusHandler = function (doc, next) {
   if (doc) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (Date.parse(doc.endDate) < today) {
         doc.status = travelStatuses.ARCHIVE
         doc.save()
      }
   }
   next()
}

module.exports = StatusHandler
