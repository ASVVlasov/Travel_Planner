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
Основные данные по размещению: тип, название, компания, въезд/выезд.
*/
const accomodationCardSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    travelers: [String], //same as traveler.id type
    payer: {
        type: String, // traveler.id who payed
    },
    cost: costSchema,
    type: {
        type: String,
    },
    name: {
        type: String,
    },
    company: {
        type: String,
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    comment: {
        type: String,
    },
    attachments: [attachmentSchema],

});

module.exports = mongoose.model("accomodationCard", accomodationCardSchema);