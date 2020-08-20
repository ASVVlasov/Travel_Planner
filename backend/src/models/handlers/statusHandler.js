const travelStatuses = require('../types/enumTravelStatuses.js')

function updateStatus(doc) {
   if (!doc) {
      return
   }
   let today = new Date()
   today.setUTCHours(0, 0, 0, 0)
   const endDate = new Date(doc.endDate)
   endDate.setUTCHours(0, 0, 0, 0)
   if (doc.status !== travelStatuses.ARCHIVE && endDate < today) {
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
