const mongoose = require('mongoose')
const Schema = mongoose.Schema
const travelStatuses = require('./types/enumTravelStatuses.js')
const travelStatusesValues = Object.values(travelStatuses)
const errorHandler = require('./handlers/errorHandler')
const statusHandler = require('./handlers/statusHandler')
const populateHandler = require('./handlers/populateHandler')

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
travelSchema.post('findOne', statusHandler)
travelSchema.post('findOne', populateHandler.travelToClient)
travelSchema.post('findOneAndUpdate', statusHandler)
travelSchema.post('findOneAndUpdate', errorHandler)
travelSchema.post('findOneAndUpdate', populateHandler.travelToClient)
travelSchema.post('save', statusHandler)
travelSchema.post('save', errorHandler)
travelSchema.post('save', populateHandler.travelToClient)

module.exports = mongoose.model('Travel', travelSchema)
