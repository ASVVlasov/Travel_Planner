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
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    beginDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    status: { //Статусы: "Подготовка / В процессе / Завершена / Рассчитана / Отменена"
        type: String,
        default: "Подготовка"
    },
    backgroundImagePath: {
        type: String,
        /*TODO - default: "PATH to default background image" */
    },
    travelers: [String], //same as traveler.id type
    transportCards: [TransportCard],
    accomodationCards: [AccomodationCard],
    entertaimentCards: [EntertaimentCard],
    todoCards: [TodoCard]
});

module.exports = mongoose.model("board", boardSchema);