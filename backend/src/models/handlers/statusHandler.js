const travelStatuses = require('../types/enumTravelStatuses.js')

function updateStatus(doc) {
   if (!doc) {
      return
   }
   const today = new Date()
   today.setHours(0, 0, 0, 0)
   if (doc.status !== travelStatuses.ARCHIVE && Date.parse(doc.endDate) < today) {
      doc.status = travelStatuses.ARCHIVE
      doc.save()
   }
}

const StatusHandler = {
   handleTravel: function (doc, next) {
      updateStatus(doc)
      next()
   },
   handleUser: async function (doc, next) {
      if (doc) {
         for (const travel of doc.travels) {
            updateStatus(travel)
         }
      }
      next()
   },
}

module.exports = StatusHandler
