const mongoose = require('mongoose')
const m2s = require('mongoose-to-swagger')
/* Models */
const Traveler = require("../models/traveler.js")
const Board = require("../models/board.js")
const Accomodation = require("../models/accomodation.js")
const Entertainment = require("../models/entertainment.js")
const Transport = require("../models/transport.js")
const Todo = require("../models/todo.js")
const Attachment = require("../models/misc/attachment.js")
const Card = require("../models/card.js")
const Travel = require("../models/travel.js")
const User = require("../models/user.js")
const File = require("../models/file.js")
/* Documents */
const TravelerSchema = m2s(Traveler)
const BoardSchema = m2s(Board)
const AccomodationSchema = m2s(Accomodation)
const EntertainmentSchema = m2s(Entertainment)
const TransportSchema = m2s(Transport)
const TodoSchema = m2s(Todo)
const AttachmentSchema = m2s(Attachment)
const CardSchema = m2s(Card)
const TravelSchema = m2s(Travel)
const UserSchema = m2s(User)
const FileSchema = m2s(File)
/* Combining schema documents in one */
const schemas = {}
schemas.Traveler = TravelerSchema
schemas.Board = BoardSchema
schemas.Accomodation = AccomodationSchema
schemas.Entertainment = EntertainmentSchema
schemas.Transport = TransportSchema
schemas.Todo = TodoSchema
schemas.Attachment = AttachmentSchema
schemas.Card = CardSchema
schemas.Travel = TravelSchema
schemas.User = UserSchema
schemas.File = FileSchema

module.exports = schemas