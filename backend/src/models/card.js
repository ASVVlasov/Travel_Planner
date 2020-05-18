const mongoose = require('mongoose')
const Schema = mongoose.Schema
const EnumCardTypes = require('./types/enumCardTypes.js')
const PopulateHandler = require('./handlers/populateHandler')
const ErrorHandler = require('./handlers/errorHandler')
const createError = require('http-errors')
const cardTypes = Object.values(EnumCardTypes)
const FileModel = require('./file.js')
const PayerModel = require('./payer')

const cardSchema = new Schema({
   travelId: {
      type: mongoose.ObjectId,
      description: 'ID путешествия которому принадлежит карточка',
   },
   title: {
      type: String,
      required: true,
      description: 'Название карточки события',
   },
   type: {
      type: String,
      enum: cardTypes,
      required: true,
      description: 'Тип карточки события',
   },
   description: {
      type: String,
      default: '',
      description: 'Описание карточки события',
   },
   comment: {
      type: String,
      default: '',
      description: 'Комментарий путешественников',
   },
   cost: {
      type: Number,
      default: 0,
      description: 'Стоимость карточки события',
   },
   category: {
      type: mongoose.ObjectId,
      description: 'Категория карточки внутри типа ("авиа", "такси" и т.п.)',
      ref: 'Category',
   },
   beginDate: {
      type: Date,
      description: 'Начало события',
   },
   endDate: {
      type: Date,
      description: 'Конец события (для Todo не заполняется)',
   },
   beginPoint: {
      type: String,
      description: 'Начальная точка карточки (для Todo не заполняется)',
   },
   endPoint: {
      type: String,
      description: 'Конечная точка карточки (заполняется только для transport)',
   },
   company: {
      type: String,
      description: 'Компания, оказывающая услугу (для Todo не заполняется)',
   },
   isDone: {
      type: Boolean,
      default: false,
      description: 'Отметка о выполнении карточки (заполняется только для Todo)',
   },
   payers: [
      {
         type: mongoose.ObjectId,
         default: [],
         description: 'ID плательщиков, с информацией об оплате',
         ref: 'Payer',
      },
   ],
   files: [
      {
         type: mongoose.ObjectId,
         default: [],
         description: 'ID файлов, прикрепленных к карточке события',
         ref: 'File',
      },
   ],
})

cardSchema.statics.getCardsByCardType = async function (type, travelId) {
   type = EnumCardTypes[type]
   if (!type) {
      throw createError(400, 'cardType required')
   }
   const cards = await this.find({ type, travelId })
   // Получаем все CategoryId которые есть у карт типа type, принадлежащих доске travelId
   const categoryIds = [...new Set(cards.filter((card) => card.category).map((card) => card.category.id))]
   return [
      // Все карты
      {
         _id: 'all',
         title: type,
         cards,
      },
      // Разбивка по категориям
      ...categoryIds.map((categoryId) => {
         return {
            ...cards.find((card) => (card.category ? card.category.id === categoryId : false)).category.toObject(),
            cards: cards.filter((card) => card.category && card.category.id === categoryId),
         }
      }),
   ]
}
// Static methods
cardSchema.statics.summaryForPays = async function ({ travelId, userId }) {
   const cards = (await this.find({ travelId })).filter((card) => card.payers.find((payer) => payer.user.id === userId))
   let summary = {
      budget: 0,
      paid: 0,
      toPay: 0,
   }
   cards.forEach((card) => {
      const payInfo = card.payers.find((payer) => payer.user.id === userId)
      const costForOne = Math.round(card.cost / card.payers.length)
      summary.budget += costForOne
      summary.paid += payInfo.hasPayed ? costForOne : 0
      summary.toPay += payInfo.hasPayed ? 0 : costForOne
   })
   return summary
}
// Hooks
cardSchema.post('find', async function (docs, next) {
   for (let doc of docs) {
      await PopulateHandler.cardToClient(doc, () => {})
   }
   next()
})
cardSchema.post('findOneAndRemove', async function (doc, next) {
   for (const payer of doc.payers) {
      await PayerModel.findByIdAndRemove(payer.id)
   }
   await FileModel.deleteFiles(doc.files)
   next()
})
cardSchema.post('findOneAndUpdate', ErrorHandler)
cardSchema.post('findOneAndUpdate', PopulateHandler.cardToClient)
cardSchema.post('findOne', PopulateHandler.cardToClient)
cardSchema.post('save', ErrorHandler)
cardSchema.post('save', PopulateHandler.cardToClient)

module.exports = mongoose.model('Card', cardSchema)
