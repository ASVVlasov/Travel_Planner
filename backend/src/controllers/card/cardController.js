const FileController = require('../file/fileController')
const UserController = require('../user/userController')
const CategoryController = require('../category/categoryController')

class CardController {
   static async getFullCards(cards) {
      const fullCards = []
      for (const card of cards) {
         fullCards.push(await this.getFullCardInfo(card))
      }
      return fullCards
   }
   static async getFullCardInfo(card) {
      card.files = await FileController.getFiles(card.fileIds)
      card.users = await UserController.getShortUsers(card.userIds)
      card.category = await CategoryController.getCategoryById(card.categoryId)
      return JSON.parse(JSON.stringify(card))
   }
}

module.exports = CardController
