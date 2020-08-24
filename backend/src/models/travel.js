const mongoose = require('mongoose')
const Schema = mongoose.Schema
const travelStatuses = require('./types/enumTravelStatuses.js')
const travelStatusesValues = Object.values(travelStatuses)
const CardModel = require('./card')
const UserModel = require('./user')
const errorHandler = require('./handlers/errorHandler')
const StatusHandler = require('./handlers/statusHandler')
const populateHandler = require('./handlers/populateHandler')
const commonHandlers = require('./handlers/commonHandlers')
const Dates = commonHandlers.Dates
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
   owner: {
      type: mongoose.ObjectId,
      description: 'ID создателя поездки',
      required: true,
      ref: 'User',
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

travelSchema.statics.isOwner = async function (travel, userId) {
   return travel.owner.toString() === userId
}

travelSchema.statics.hasUser = function (travel, userId) {
   return travel.users.find((user) => user.id === userId)
}

travelSchema.statics.dateChanged = function (oldTravel, newTravel) {
   return (
      !Dates.isEqual(oldTravel.beginDate, newTravel.beginDate) || !Dates.isEqual(oldTravel.endDate, newTravel.endDate)
   )
}

travelSchema.statics.cardOutdated = function (travel, card) {
   return Dates.compare(card.beginDate, travel.beginDate) || Dates.compare(travel.endDate, card.endDate)
}

travelSchema.statics.leaveTravel = async function (travelId, userId) {
   let travel = await this.findById(travelId)
   if (travel.status === travelStatuses.ARCHIVE) {
      throw Errors.travelError.cantLeaveError
   } else {
      await CardModel.removeUser(travelId, userId)
      travel.cards = travel.cards.filter((card) => !(card.payers.length === 1 && card.payers[0].user.id === userId))
      await UserModel.findByIdAndUpdate(userId, { $pull: { travels: travelId } })
      travel.users.pull(userId)
      await travel.save()
      return travel
   }
}
travelSchema.statics.deleteTravel = async function (travel) {
   const travelId = travel._id
   for (const user of travel.users) {
      await UserModel.findByIdAndUpdate(user._id, { $pull: { travels: travelId } })
   }
   await CardModel.deleteCards(travelId)
   return await this.findByIdAndRemove(travelId)
}

travelSchema.statics.pushUser = async function (travelId, userId) {
   const travel = await this.findById(travelId)
   if (travel.users.find((u) => u.id === userId) || !userId) {
      throw Errors.userError.duplicateUser
   }
   const update = { $push: { users: userId } }
   return await this.findByIdAndUpdate(travelId, update, { new: true })
}

travelSchema.statics.updateTravel = async function (travelModel) {
   if (Dates.compare(travelModel.endDate, travelModel.beginDate)) {
      throw Errors.travelError.dateError
   } else {
      let oldTravel = await this.findById(travelModel._id)
      if (this.dateChanged(oldTravel, travelModel)) {
         for (const cardModel of travelModel.cards) {
            const card = await CardModel.findById(cardModel._id)
            if (this.cardOutdated(travelModel, card)) {
               delete travelModel.cards
               delete travelModel.users
               await this.findByIdAndUpdate(travelModel._id, travelModel, { new: true })
               throw Errors.travelError.dateCompareError
            }
         }
      }
   }
   delete travelModel.cards
   delete travelModel.users
   return await this.findByIdAndUpdate(travelModel._id, travelModel, { new: true })
}

travelSchema.post('findOne', errorHandler.ErrorTravelHandler)
travelSchema.post('findOne', populateHandler.travelToClient)
travelSchema.post('findOneAndUpdate', errorHandler.ErrorTravelHandler)
travelSchema.post('findOneAndUpdate', populateHandler.travelToClient)
travelSchema.pre('save', function (next) {
   if (Dates.compare(this.endDate, this.beginDate)) {
      next(Errors.travelError.dateError)
   } else {
      next()
   }
})
travelSchema.post('save', errorHandler.ErrorTravelHandler)
travelSchema.post('save', populateHandler.travelToClient)
travelSchema.post('findOne', StatusHandler.handleTravel)
travelSchema.post('findOneAndUpdate', StatusHandler.handleTravel)
travelSchema.post('save', StatusHandler.handleTravel)

module.exports = mongoose.model('Travel', travelSchema)
