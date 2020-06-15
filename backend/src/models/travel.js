const mongoose = require('mongoose')
const Schema = mongoose.Schema
const travelStatuses = require('./types/enumTravelStatuses.js')
const travelStatusesValues = Object.values(travelStatuses)
const CardModel = require('./card')
const UserModel = require('./user')
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

travelSchema.statics.isOwner = async function (travelId, userId) {
   return (await this.findById(travelId)).owner === userId
}
travelSchema.statics.leaveTravel = async function (travelId, userId) {
   let travel = await this.findById(travelId)
   if (travel.status === travelStatuses.ARCHIVE) {
      res.json({ message: 'Поездка прошла, поэтому вы не можете ее покинуть.' })
   } else {
      travel.users.pull(userId)
      travel.save()
      await CardModel.removeUser(travelId, userId)
      await UserModel.findByIdAndUpdate(userId, { $pull: { travels: travelId } })
      res.json(travel)
   }
}
travelSchema.statics.deleteTravel = async function (travelId) {
   await CardModel.deleteCards(travelId)
   res.json(await this.findByIdAndRemove(travelId))
}

travelSchema.post('findOne', statusHandler)
travelSchema.post('findOne', populateHandler.travelToClient)
travelSchema.post('findOneAndUpdate', statusHandler)
travelSchema.post('findOneAndUpdate', errorHandler)
travelSchema.post('findOneAndUpdate', populateHandler.travelToClient)
travelSchema.post('save', statusHandler)
travelSchema.post('save', errorHandler)
travelSchema.post('save', populateHandler.travelToClient)

module.exports = mongoose.model('Travel', travelSchema)
