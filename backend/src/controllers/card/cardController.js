const CardModel = require('../../models/card.js')
const TravelModel = require('../../models/travel')
const FileController = require('../file/fileController')
const UserController = require('../user/userController')
const CategoryController = require('../category/categoryController')

class CardController {
   /**
    * Получение всех карт в расширенном составе
    * @param {CardModel[]} cards
    * @return {JSON}
    */
   static async getFullCards(cards) {
      const fullCards = []
      for (const card of cards) {
         let newFullCardInfo = await this.getFullCardInfo(card)
         fullCards.push(newFullCardInfo)
      }
      return fullCards
   }
   /**
    * Добавление объектов file, users, category в карту
    * @param {CardModel[]} cards
    * @return {JSON}
    */
   static async getFullCardInfo(card) {
      card.files = await FileController.getFiles(card.fileIds)
      card.users = await UserController.getShortUsers(card.userIds)
      card.category = await CategoryController.getCategoryById(card.categoryId)
      return JSON.parse(JSON.stringify(card))
   }
   /**
    * Добавление новой карты события
    * @param {mongoose.ObjectID} travelId - ID of a travel board
    * @param {CardModel} card - params of a new Card
    */
   static async createCard(travelId, card) {
      let travel = await TravelModel.findById(travelId)
      let newCard = new CardModel(card)
      travel.cards.push(newCard)
      await travel.save()
      return this.getFullCardInfo(JSON.parse(JSON.stringify(newCard)))
   }
   /**
    * Чтение всех карт с доски путешествия
    * @param {mongoose.ObjectID} travelId - ID of a travel board
    */
   static async getAllCards(travelId) {
      let travel = await TravelModel.findById(travelId)
      let cards = []
      for (const card of travel.cards) {
         cards.push(await this.getFullCardInfo(JSON.parse(JSON.stringify(card))))
      }
      return cards
   }
   /**
    * Чтение нужной карты
    * @param {mongoose.ObjectID} travelId - ID of a travel board
    * @param {mongoose.ObjectID} cardId - ID of a card on travel board
    */
   static async readCard(travelId, cardId) {
      let travel = await TravelModel.findById(travelId)
      let card = await travel.cards.id(cardId)
      return this.getFullCardInfo(JSON.parse(JSON.stringify(card)))
   }
   /**
    * Изменение карты события
    * @param {mongoose.ObjectID} travelId - ID of a travel board
    * @param {CardModel} card - params of a updating Card
    */
   static async updateCard(travelId, card) {
      let travel = await TravelModel.findById(travelId)
      let updatedCard = travel.cards.id(card._id)
      Object.keys(card).forEach((key) => {
         updatedCard[key] = card[key]
      })
      await travel.save()
      return this.getFullCardInfo(JSON.parse(JSON.stringify(updatedCard)))
   }
   /**
    * Удаление карты события
    * @param {mongoose.ObjectID} travelId - ID of a travel board
    * @param {mongoose.ObjectID} cardId - ID of a card to delete
    */
   static async deleteCard(travelId, cardId) {
      let travel = await TravelModel.findById(travelId)
      travel.cards.id(cardId).remove()
      await travel.save()
      return {}
   }
   /**
    *
    * @param {mongoose.ObjectID} travelId
    * @param {mongoose.ObjectID} cardId
    * @param {File} file
    */
   static async addFile(travelId, cardId, file) {
      let newFile = await FileController.uploadFile(file)
      let travel = await TravelModel.findById(travelId)
      let updatedCard = await travel.cards.id(cardId)
      updatedCard.fileIds.push(newFile._id)
      updatedCard.markModified('fileIds')
      travel.markModified('cards')
      await travel.save()
      return this.getFullCardInfo(JSON.parse(JSON.stringify(updatedCard)))
   }
   static async removeFile(travelId, cardId, fileId) {
      await FileController.deleteFileById(fileId)
      let travel = await TravelModel.findById(travelId)
      let updatedCard = await travel.cards.id(cardId)
      let index = updatedCard.fileIds.indexOf(fileId)
      updatedCard.fileIds.splice(index, 1)
      updatedCard.markModified('fileIds')
      travel.markModified('cards')
      await travel.save()
      return this.getFullCardInfo(JSON.parse(JSON.stringify(updatedCard)))
   }
}

module.exports = CardController
