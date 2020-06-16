const travelStatuses = require('../types/enumTravelStatuses.js')

function updateStatus(doc) {
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
      for (let i = 0; i < doc.travels.length; i++) {
         updateStatus(doc.travels[i])
      }
      next()
   },
}

module.exports = StatusHandler
