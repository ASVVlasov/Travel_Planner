const mongoose = require('mongoose')
const m2s = require('mongoose-to-swagger')
/* Models */
const User = require("../models/user.js")
const Travel = require("../models/travel.js")
const Card = require("../models/card.js")
const File = require("../models/file.js")
const Category = require("../models/category.js")
/* Documents */
const UserSchema = m2s(User)
const TravelSchema = m2s(Travel)
const CardSchema = m2s(Card)
const FileSchema = m2s(File)
const CategorySchema = m2s(Category)
/* Combining schema documents in one */
const schemas = {}
schemas.User = UserSchema
schemas.Travel = TravelSchema
schemas.Card = CardSchema
schemas.File = FileSchema
schemas.Category = CategorySchema

module.exports = schemas