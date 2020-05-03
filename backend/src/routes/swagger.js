const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/index.json');
const m2s = require('mongoose-to-swagger');
const router = require('express').Router();

const Traveler = require("../models/traveler");
const TravelerSchema = m2s(Traveler);
const header = require("../swagger/header.json");
header.components.schemas.Traveler = TravelerSchema;

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(header));

module.exports = router;