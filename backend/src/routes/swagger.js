const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const m2s = require('mongoose-to-swagger')
const router = require('express').Router()

const Traveler = require("../models/traveler.js")
const Board = require("../models/board.js")
const Accomodation = require("../models/accomodation.js")
const Entertaiment = require("../models/entertaiment.js")
const Transport = require("../models/transport.js")
const Todo = require("../models/todo.js")
const Attachment = require("../models/misc/attachment.js")
const TravelerSchema = m2s(Traveler)
const BoardSchema = m2s(Board)
const AccomodationSchema = m2s(Accomodation)
const EntertaimentSchema = m2s(Entertaiment)
const TransportSchema = m2s(Transport)
const TodoSchema = m2s(Todo)
const AttachmentSchema = m2s(Attachment)
const document = require("../swagger/definition.js")
document.components = {}
document.components.schemas = {}
document.components.schemas.Traveler = TravelerSchema
document.components.schemas.Board = BoardSchema
document.components.schemas.Accomodation = AccomodationSchema
document.components.schemas.Entertaiment = EntertaimentSchema
document.components.schemas.Transport = TransportSchema
document.components.schemas.Todo = TodoSchema
document.components.schemas.Attachment = AttachmentSchema
router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(document))

module.exports = router