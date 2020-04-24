const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransportCard = require("./transport.js")
const AccomodationCard = require("./accomodation.js")
const EntertaimentCard = require("./entertaiment.js")
const TodoCard = require("./todo.js")

/*
Основная информация о доске, ее карточки
*/

const boardSchema = new Schema({
    name: {
        type: String,
    },
    beginDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: { //Статусы, пока: "Активная / Архивная"
        type: String,
        default: "Активная"
    },
    travelers: [ObjectId],
    transportCards: [TransportCard],
    accomodationCards: [AccomodationCard],
    entertaimentCards: [EntertaimentCard],
    todoCards: [TodoCard]
});

module.exports = mongoose.model("board", boardSchema);