const mongoose = require('mongoose')
const Schema = mongoose.Schema
const travelStatuses = require('./types/enumTravelStatuses.js')
const travelStatusesValues = Object.values(travelStatuses)
const errorHandler = require('./handlers/errorHandler')
const statusHandler = require('./handlers/statusHandler')
const populateHandler = require('./handlers/populateHandler')
const commonHandlers = require('./handlers/commonHandlers')
const Errors = require('./types/errors')

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

travelSchema.statics.pushUser = async function (travelId, userId) {
   const travel = await this.findById(travelId)
   if (travel.users.find((u) => u.id === userId) || !userId) {
      throw Errors.userError.duplicateUser
   }
   const update = { $push: { users: userId } }
   return await this.findByIdAndUpdate(travelId, update, { new: true })
}

travelSchema.statics.updateTravel = async function (travelModel) {
   if (commonHandlers.compareDates(travelModel.endDate, travelModel.beginDate)) {
      throw Errors.travelError.dateError
   } else {
      // TODO обсудить как сделать
      // for (const cardModel of travelModel.cards) {
      //    const card = await CardModel.findById(cardModel._id)
      //    if (
      //       commonHandlers.compareDates(card.beginDate, travelModel.beginDate) ||
      //       commonHandlers.compareDates(card.endDate, travelModel.endDate)
      //    ) {
      //       throw createError(
      //          400,
      //          'Даты путешествия изменены успешно, рекомендуем проверить даты в карточках, чтобы точно ничего не перепутать 😥'
      //       )
      //    }
      // }
   }
   delete travelModel.cards
   delete travelModel.users
   return await this.findByIdAndUpdate(travelModel._id, travelModel, { new: true })
}

travelSchema.post('findOne', errorHandler.ErrorTravelHandler)
travelSchema.post('findOne', statusHandler)
travelSchema.post('findOne', populateHandler.travelToClient)
travelSchema.post('findOneAndUpdate', errorHandler.ErrorTravelHandler)
travelSchema.post('findOneAndUpdate', statusHandler)
travelSchema.post('findOneAndUpdate', populateHandler.travelToClient)
travelSchema.pre('save', function (next) {
   if (commonHandlers.compareDates(this.endDate, this.beginDate)) {
      next(Errors.travelError.dateError)
   } else {
      next()
   }
})
travelSchema.post('save', statusHandler)
travelSchema.post('save', errorHandler.ErrorTravelHandler)
travelSchema.post('save', populateHandler.travelToClient)

module.exports = mongoose.model('Travel', travelSchema)
