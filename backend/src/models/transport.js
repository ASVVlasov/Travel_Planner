const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Заглушки пока не определимся с составом информации
let attachmentSchema = new Schema({ //Прикрепленные файлы
    name: String
})
let costSchema = new Schema({
    value: mongoose.Decimal128,
    currency: String
})
/*
Основные данные путешественника, его контакты и доски
*/
const transportCardSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    travelers: [String], //same as traveler.id type
    payer: {
        type: String, // traveler.id who payed
    },
    cost: costSchema,
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
    attachments: [attachmentSchema],

});

module.exports = mongoose.model("transportCard", transportCardSchema);