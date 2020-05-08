const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        description: "Отображаемое имя (обязательное поле)"
    },
    surname: {
        type: String,
        description: "Фамилия"
    },
    name: {
        type: String,
        description: "Имя"
    },
    middleName: {
        type: String,
        description: "Отчество"
    },
    birthDate: {
        type: Date,
        description: "Дата рождения"
    }
})

const personalInfoSchema = new Schema({
    title: {
        type: String,
        description: "Состав пока не определен"
    }
})

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        description: "Логин путешественника"
    },
    password: {
        type: String,
        required: true,
        description: "Пароль путешественника"
    },
    avatarFileId: {
        type: mongoose.ObjectId,
        description: "ID файла аватарки путешественника"
    },
    email: {
        type: String,
        description: "Электронная почта путешественника"
    },
    profile: profileSchema,
    personalInfo: personalInfoSchema,
    contactIds: {
        type: [mongoose.ObjectId],
        description: "ID друзей путешественника"
    },
    travelIds: {
        type: [mongoose.ObjectId],
        description: "ID досок путешествий, в которых принимает участие user"
    }
})

module.exports = mongoose.model("User", userSchema)