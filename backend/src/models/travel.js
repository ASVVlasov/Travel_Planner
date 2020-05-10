const mongoose = require('mongoose')
const Schema = mongoose.Schema
const travelStatuses = require('./types/enumTravelStatuses.js')
const travelStatusesValues = Object.values(travelStatuses)
const Card = require('./card').schema

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
   userIds: {
      type: [mongoose.ObjectId],
      description: 'ID участников путешествия',
   },
   cards: {
      type: [Card],
      default: [],
      description: 'События поездки',
   },
})
module.exports = mongoose.model('Travel', travelSchema)
