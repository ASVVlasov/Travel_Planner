const travelStatuses = require('../types/enumTravelStatuses.js')
const Dates = require('./commonHandlers').Dates

function updateStatus(doc) {
   if (!doc) {
      return
   }
   const today = new Date()
   if (doc.status !== travelStatuses.ARCHIVE && Dates.compare(doc.endDate, today)) {
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
