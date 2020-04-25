/*Attachment schema */
const Attachment = require("../models/misc/attachment.js")
console.log("Создание прикрепленного документа")
let att = new Attachment({
    name: "Бронь.pdf",
    path: "Some path"
})
console.log(att)
/*Accomodation schema*/
const Accomodation = require("../models/accomodation.js")
console.log("Создание карточки размещения")
let acc = new Accomodation({
    travelers: [att._id],
    payer: att._id,
    cost: 123.456,
    type: "type1",
    name: "name2",
    company: "company3",
    checkIn: Date.now(),
    checkOut: Date.now(),
    comment: "comment4"
});
console.log(acc)
console.log("Закрепляем файл")
acc.attachments.push(att)
console.log(acc.attachments)
/*Entertaiment schema*/
const Entertaiment = require("../models/entertaiment.js")
console.log("Создание карточки досуга")
let ent = new Entertaiment({
    travelers: [att._id, acc._id],
    payer: att._id,
    cost: 456.789,
    name: "Бар",
    company: "Gellert",
    place: "Самара, ул. Победы, д. 10",
    beginDate: Date.now(),
    endDate: Date.now(),
    comment: "Beer"
})
console.log(ent)
console.log("Закрепляем файл")
ent.attachments.push(att)
console.log(ent.attachments)
/*Transport schema*/
const Transport = require("../models/transport.js")
console.log("Создание карточки транспорта")
let tra = new Transport({
    travelers: [att._id, acc._id, ent._id],
    payer: ent._id,
    cost: 300,
    transport: "Пешком",
    company: "Alone",
    departurePlace: "Самара, ул. Победы, д. 12",
    departureDate: Date.now(),
    arrivalPlace: "Самара, ул. Победы, д. 10",
    arrivalDate: Date.now(),
    comment: "Let's go!"
})
console.log(tra)
console.log("Закрепляем файл")
tra.attachments.push(att)
console.log(tra.attachments)
/*Todo schema*/
const Todo = require("../models/todo.js")
console.log("Создаем карточку из списка дел")
let tod = new Todo({
    travelers: [att._id, acc._id, ent._id, tra._id],
    header: "Сходить в магазин",
    details: "1.5 litres",
    todoDate: Date.now(),
})
console.log(tod)
console.log("Закрепляем файл")
tod.attachments.push(att)
console.log(tod.attachments)
console.log("Выполняем задание!")
tod.isDone = true;
console.log(tod.isDone)
/*Board schema*/
const Board = require("../models/board.js")
console.log("Создание доски")
let board = new Board({
    name: "Board1",
    beginDate: Date.now(),
    endDate: Date.now(),
    travelers: [att._id, acc._id, ent._id, tra._id, tod._id],
    transportCards: [tra._id],
    accomodationCards: [acc._id],
    entertaimentCards: [ent._id],
    todoCards: [tod._id]
})
console.log(board)
console.log("Меняем статус")
board.status = "Архивная"
console.log("Доска: " + board.status)
/*Traveler schema*/
const Traveler = require("../models/traveler.js")
console.log("Создание путешественника")
let traveler = new Traveler({
    login: "Вася",
    password: "password",
    mail: "example@mail.ru",
})
console.log(traveler)
console.log("Задаем путь для аватарки")
traveler.avatarPath = "Some path"
console.log(traveler.avatarPath)
console.log("Добавляем друга")
traveler.contacts.push(att._id)
console.log(traveler.contacts)
console.log("Добавляем доску")
traveler.boards.push(board._id)
console.log(traveler.boards)
console.log("Профиль и личные данные пока не добавляем :)")
console.log("Конец теста")