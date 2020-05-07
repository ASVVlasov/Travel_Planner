const Travel = require('../../models/board.js')

class TravelController {
   static create(travelModel) {
      return Travel.create(travelModel)
   }
   static read(travelId) {
      return Travel.findById(travelId)
   }
   static delete(travelId) {
      return Travel.findByIdAndDelete(travelId)
   }
   static async update(boardSchema) {
      return Travel.findByIdAndUpdate(boardSchema._id, boardSchema, { new: true })
   }
}

module.exports = TravelController
