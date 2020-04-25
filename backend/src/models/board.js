const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransportCard = require("./transport.js").schema
const AccomodationCard = require("./accomodation.js").schema
const EntertaimentCard = require("./entertaiment.js").schema
const TodoCard = require("./todo.js").schema

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
    travelers: [mongoose.ObjectId],
    transportCards: [TransportCard],
    accomodationCards: [AccomodationCard],
    entertaimentCards: [EntertaimentCard],
    todoCards: [TodoCard]
});

module.exports = mongoose.model("board", boardSchema);