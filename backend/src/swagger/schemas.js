const mongoose = require('mongoose')
const m2s = require('mongoose-to-swagger')
/* Models */
const Traveler = require("../models/traveler.js")
const Board = require("../models/board.js")
const Accomodation = require("../models/accomodation.js")
const Entertaiment = require("../models/entertainment.js")
const Transport = require("../models/transport.js")
const Todo = require("../models/todo.js")
const Attachment = require("../models/misc/attachment.js")
/* Documents */
const TravelerSchema = m2s(Traveler)
const BoardSchema = m2s(Board)
const AccomodationSchema = m2s(Accomodation)
const EntertaimentSchema = m2s(Entertaiment)
const TransportSchema = m2s(Transport)
const TodoSchema = m2s(Todo)
const AttachmentSchema = m2s(Attachment)
/* Combining schema documents in one */
const schemas = {}
schemas.Traveler = TravelerSchema
schemas.Board = BoardSchema
schemas.Accomodation = AccomodationSchema
schemas.Entertaiment = EntertaimentSchema
schemas.Transport = TransportSchema
schemas.Todo = TodoSchema
schemas.Attachment = AttachmentSchema

module.exports = schemas