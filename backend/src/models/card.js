const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cardTypes = Object.values(require('./types/enumCardTypes.js'))

const cardSchema = new Schema({
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
   categoryId: {
      type: mongoose.ObjectId,
      description: 'Категория карточки внутри типа ("авиа", "такси" и т.п.)',
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
   userIds: {
      type: [mongoose.ObjectId],
      description: 'ID участников карточки события',
   },
   payerId: {
      type: mongoose.ObjectId,
      description: 'ID участника, оплатившего карточку события за всех',
   },
   fileIds: {
      type: [mongoose.ObjectId],
      description: 'ID файлов, прикрепленных к карточке события',
   },
})
module.exports = mongoose.model('Card', cardSchema)
