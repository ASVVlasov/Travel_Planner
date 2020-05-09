const TravelModel = require('../../models/travel')
const UserController = require('../user/userController')
const CardController = require('../card/cardController')
const EnumCardTypes = require('../../models/types/enumCardTypes')

class TravelController {
   /**
    * @param {ObjectId} travelId
    * @return {TravelModel}
    */
   static async _getTravelById(travelId) {
      return await TravelModel.findById(travelId).lean()
   }
   /**
    * @param {ObjectId} travelId
    * @return {TravelModel}
    */
   static async getFullTravelInfo(travelId) {
      const travel = await this._getTravelById(travelId)
      travel.users = await UserController.getFullUsersInfo(travel.userIds)
      for (let userId of travel.userIds) {
         travel.users.push(await UserController.getFullUserInfo(userId))
      }
      return travel
   }
   /**
    * @param {ObjectId} travelId
    * @return {TravelModel}
    */
   static async getShortTravelInfo(travelId) {
      const travel = await this._getTravelById(travelId)
      travel.users = await UserController.getShortUsers(travel.userIds)
      travel.cards = await CardController.getFullCards(travel.cards)
      return travel
   }
   /**
    * @param {ObjectId} travelId
    * @param {EnumCardTypes} cardType
    * @return {any} object which describe model for frontend TravelPage
    */
   static async getTravelByCardType(cardType, travelId) {
      if (!!EnumCardTypes[cardType]) {
         const travel = await this.getShortTravelInfo(travelId)
         const cards = []
         travel.cards.forEach((card) => {
            if (card.type === cardType) {
               cards.push(card)
            }
         })
         const categories = []
         cards.forEach((card) => {
            let find = categories.find((cat) => cat._id === card.category._id)
            if (!find) {
               categories.push(JSON.parse(JSON.stringify(card.category)))
            }
         })
         const tabs = categories.map((category) => {
            category.cards = cards.filter((card) => card.category._id === category._id)
            return category
         })
         return {
            _id: travel._id,
            title: travel.title,
            beginDate: travel.beginDate,
            endDate: travel.endDate,
            users: travel.users,
            tabs,
         }
      } else {
         return Error('cardType is empty')
      }
   }
   /**
    * @return {[TravelModel]}
    */
   static getAllTravels() {
      return TravelModel.find()
   }
   static createTravel(travelModel) {
      return TravelModel.create(travelModel)
   }
   static delete(travelId) {
      return TravelModel.findByIdAndDelete(travelId)
   }
   static async update(boardSchema) {
      return TravelModel.findByIdAndUpdate(boardSchema._id, boardSchema, { new: true })
   }
}

module.exports = TravelController
