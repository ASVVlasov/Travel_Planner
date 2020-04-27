const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Attachment = require("./misc/attachment.js").schema

/*
Основные данные по транспорту: какой, компания-перевозчик, откуда/куда/когда перемещаемся
*/
const transportCardSchema = new Schema({
    travelers: [mongoose.ObjectId],
    payer: {
        type: mongoose.ObjectId, // traveler.id who payed
    },
    cost: Number,
    transport: {
        type: String,
    },
    company: {
        type: String,
    },
    departurePlace: {
        type: String,
    },
    departureDate: {
        type: Date,
    },
    arrivalPlace: {
        type: String,
    },
    arrivalDate: {
        type: Date,
    },
    comment: {
        type: String,
    },
    attachments: [Attachment],

});

module.exports = mongoose.model("transportCard", transportCardSchema);