const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Заглушки пока не определимся с составом информации
let transportCardSchema = new Schema({ //
    name: String
})
let accomodationCardSchema = new Schema({ // 
    name: String
})
let entertaimentCardSchema = new Schema({ // 
    name: String
})

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
        type: String,
    },
    endDate: {
        type: String,
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
    transportCards: [transportCardSchema],
    accomodationCards: [accomodationCardSchema],
    entertaimentCards: [entertaimentCardSchema],
    todoCards: [todoCardSchema]
});

module.exports = mongoose.model("board", boardSchema);