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
      travel.markModified('cards')
      return await travel
         .save()
         .then(() => this.getFullCardInfo(newCard))
         .catch((err) => Error(JSON.stringify(err)))
   }
   /**
    * Удаление карты события
    * @param {mongoose.ObjectID} travelId - ID of a travel board
    * @param {mongoose.ObjectID} cardId - ID of a card to delete
    */
   static async deleteCard(travelId, cardId) {
      let travel = await TravelModel.findById(travelId)
      travel.cards.id(cardId).remove()
      travel.markModified('cards')
      return await travel.save().catch((err) => Error(JSON.stringify(err)))
   }
   /**
    * Изменение карты события
    * @param {mongoose.ObjectID} travelId - ID of a travel board
    * @param {CardModel} card - params of a updating Card
    */
   static async updateCard(travelId, card) {
      let travel = await TravelModel.findById(travelId)
      let updatedCard = await travel.cards.findByIdAndUpdate(card._id, card, { new: true })
      travel.markModified('cards')
      return await travel
         .save()
         .then(() => this.getFullCardInfo(updatedCard))
         .catch((err) => Error(JSON.stringify(err)))
   }
   static async addFile(travelId, cardId, file) {
      let newFile = FileController.uploadFile(file)
      let travel = await TravelModel.findById(travelId)
      let updatedCard = await travel.cards.id(cardId)
      updatedCard.fileIds.push(newFile._id)
      updatedCard.markModified('fileIds')
      travel.markModified('cards')
      return await travel
         .save()
         .then(() => this.getFullCardInfo(updatedCard))
         .catch((err) => Error(JSON.stringify(err)))
   }
   static async removeFile(travelId, cardId, fileId) {
      await FileController.deleteFile(fileId)
      let travel = await TravelModel.findById(travelId)
      let updatedCard = await travel.cards.id(cardId)
      updatedCard.fileIds.id(fileId).remove()
      updatedCard.markModified('fileIds')
      travel.markModified('cards')
      return await travel
         .save()
         .then(() => this.getFullCardInfo(updatedCard))
         .catch((err) => Error(JSON.stringify(err)))
   }
}

module.exports = CardController
