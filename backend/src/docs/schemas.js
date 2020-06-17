const mongoose = require('mongoose')
const m2s = require('mongoose-to-swagger')
/* Models */
const User = require('../models/user.js')
const Travel = require('../models/travel.js')
const Card = require('../models/card.js')
const File = require('../models/file.js')
const Category = require('../models/category.js')
const Payer = require('../models/payer.js')
const Feedback = require('../models/feedback.js')
/* Documents */
const UserSchema = m2s(User)
const TravelSchema = m2s(Travel)
const CardSchema = m2s(Card)
const PayerSchema = m2s(Payer)
const FileSchema = m2s(File)
const CategorySchema = m2s(Category)
const FeedbackSchema = m2s(Feedback)
/* Combining schema documents in one */
const schemas = {}
schemas.User = UserSchema
schemas.Travel = TravelSchema
schemas.Card = CardSchema
schemas.Payer = PayerSchema
schemas.File = FileSchema
schemas.Category = CategorySchema
schemas.Feedback = FeedbackSchema

module.exports = schemas
