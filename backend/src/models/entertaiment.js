const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Заглушки пока не определимся с составом информации
let attachmentSchema = new Schema({ //Прикрепленные файлы
    name: String,
    path: String
})
let costSchema = new Schema({
    value: mongoose.Decimal128,
    currency: String
})
/*
Основные данные по развлечениям: тип, компания, где, когда(начало/конец).
*/
const entertaimentCardSchema = new Schema({
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
    place: {
        type: String,
    },
    beginDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    comment: {
        type: String,
    },
    attachments: [attachmentSchema],

});

module.exports = mongoose.model("entertaimentCard", entertaimentCardSchema);