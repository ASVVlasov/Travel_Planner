const mongoose = require('mongoose')
const Schema = mongoose.Schema
const travelStatuses = require('./types/enumTravelStatuses.js')
const travelStatusesValues = Object.values(travelStatuses)
const ErrorHandler = require('./handlers/errorHandler')
const StatusHandler = require('./handlers/statusHandler')
const PopulateHandler = require('./handlers/populateHandler')

const travelSchema = new Schema({
   title: {
      type: String,
      required: true,
      description: 'Название доски путешествия',
   },
   beginDate: {
      type: Date,
      description: 'Начало путешествия',
   },
   endDate: {
      type: Date,
      description: 'Конец путешествия',
   },
   status: {
      type: String,
      default: travelStatuses.ACTIVE,
      enum: travelStatusesValues,
      description: 'Статус поездки',
   },
   users: [
      {
         type: mongoose.ObjectId,
         description: 'ID участников путешествия',
         default: [],
         ref: 'User',
      },
   ],
   cards: [
      {
         type: mongoose.ObjectId,
         description: 'Карточки поездки',
         default: [],
         ref: 'Card',
      },
   ],
})

travelSchema.post('findOne', PopulateHandler.travelToClient)
travelSchema.post('findOne', StatusHandler.handleTravel)
travelSchema.post('findOneAndUpdate', ErrorHandler)
travelSchema.post('findOneAndUpdate', PopulateHandler.travelToClient)
travelSchema.post('findOneAndUpdate', StatusHandler.handleTravel)
travelSchema.post('save', ErrorHandler)
travelSchema.post('save', PopulateHandler.travelToClient)
travelSchema.post('save', StatusHandler.handleTravel)

module.exports = mongoose.model('Travel', travelSchema)
