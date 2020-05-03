const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger/index.json')
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
const header = require("../swagger/header.json")
header.components.schemas.Traveler = TravelerSchema
header.components.schemas.Board = BoardSchema
header.components.schemas.Accomodation = AccomodationSchema
header.components.schemas.Entertaiment = EntertaimentSchema
header.components.schemas.Transport = TransportSchema
header.components.schemas.Todo = TodoSchema
header.components.schemas.Attachment = AttachmentSchema
router.use('/', swaggerUi.serve)
router.get('/', swaggerUi.setup(header))

module.exports = router