const mongoose = require('mongoose')
const Schema = mongoose.Schema
const errorHandler = require('./handlers/errorHandler')
const populateHandler = require('./handlers/populateHandler')

const payerSchema = new Schema({
   user: {
      type: mongoose.ObjectId,
      required: true,
      description: 'Пользователь который учавствует в оплате',
      ref: 'User',
   },
   cardId: {
      type: mongoose.ObjectId,
      required: true,
      description: 'ID карточки в которой учавствует плательщик',
   },
   isPayer: {
      type: Boolean,
      default: false,
      description: 'Признак оплаты за всех участников',
   },
   hasPayed: {
      type: Boolean,
      default: false,
      description: 'Признак оплаты за себя',
   },
})

payerSchema.statics.deletePayers = async function (payerIds) {
   for (const payerId of payerIds) {
      await this.findByIdAndRemove(payerId)
   }
}
payerSchema.statics.deletePayerCards = async function (user, cardIds) {
   for (const cardId of cardIds) {
      await this.findOneAndRemove({ user, cardId })
   }
}
// payerSchema.post('findOne', populateHandler.travelToClient)
// payerSchema.post('save', errorHandler)
// payerSchema.post('save', populateHandler.travelToClient)

module.exports = mongoose.model('Payer', payerSchema)
