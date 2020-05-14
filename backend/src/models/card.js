const mongoose = require('mongoose')
const Schema = mongoose.Schema
const EnumCardTypes = require('./types/enumCardTypes.js')
const PopulateHandler = require('./handlers/populateHandler')
const createError = require('http-errors')
const cardTypes = Object.values(EnumCardTypes)

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
   users: [
      {
         type: mongoose.ObjectId,
         description: 'ID участников карточки события',
         ref: 'User',
      },
   ],
   payer: {
      type: mongoose.ObjectId,
      description: 'ID участника, оплатившего карточку события за всех',
      ref: 'User',
   },
   files: [
      {
         type: mongoose.ObjectId,
         description: 'ID файлов, прикрепленных к карточке события',
         ref: 'File',
      },
   ],
})

cardSchema.static('getCardsByCardType', async function (type, travelId) {
   type = EnumCardTypes[type]
   if (!!type) {
      const cards = await this.find({ type, travelId })
      const categoryIds = [...new Set(cards.filter((card) => card.category).map((card) => card.category.id))]
      return [
         {
            _id: 'all',
            title: type,
            cards,
         },
         ...categoryIds.map((categoryId) => {
            return {
               ...cards.find((card) => (card.category ? card.category.id === categoryId : false)).category.toObject(),
               cards: cards.filter((card) => card.category && card.category.id === categoryId),
            }
         }),
      ]
   } else {
      throw createError(400, 'cardType required')
   }
})
cardSchema.post('find', async function (docs, next) {
   for (let doc of docs) {
      await PopulateHandler.cardToClient(doc, () => {})
   }
})
cardSchema.post('findOne', PopulateHandler.cardToClient)
cardSchema.post('save', PopulateHandler.cardToClient)
module.exports = mongoose.model('Card', cardSchema)
