const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Заглушки пока не определимся с составом информации
let profileSchema = new Schema({ //ФИО, контакты, о себе
    name: String
})
let personalInfoSchema = new Schema({ // Паспорта, загран паспорта, в общем - личное.
    name: String
})

/*
Основные данные путешественника, его контакты и доски
*/
const travelerSchema = new Schema({
    login: {
        type: String,
    },
    password: {
        type: String,
    },
    mail: {
        type: String,
    },
    avatarPath: {
        type: String,
        /*TODO - default: "PATH to default avatar image" */
    },
    contacts: [ObjectId],
    boards: [ObjectId],
    profile: profileSchema,
    personalInfo: personalInfoSchema
});

module.exports = mongoose.model("traveler", travelerSchema);