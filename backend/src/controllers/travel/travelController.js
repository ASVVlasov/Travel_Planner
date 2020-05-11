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
      travelId = '5eb56d4d771522c070eb3f6f'
      return await TravelModel.findById(travelId).lean()
   }
   /**
    * @param {ObjectId} travelId
    * @return {TravelModel}
    */
   static async getFullTravelInfo(travelId) {
      const travel = await this._getTravelById(travelId)
      travel.users = await UserController.getShortUsers(travel.userIds)
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
      const type = EnumCardTypes[cardType]
      if (!!type) {
         const travel = await this.getShortTravelInfo(travelId)
         const cards = []
         travel.cards.forEach((card) => {
            if (card.type === type) {
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
         tabs.push({
            title: type,
            cards
         })
         return {
            _id: travel._id,
            title: travel.title,
            beginDate: travel.beginDate,
            endDate: travel.endDate,
            userIds: travel.userIds,
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
   static deleteTravel(travelId) {
      return TravelModel.findByIdAndDelete(travelId)
   }
   static updateTravel(travelModel) {
      return TravelModel.findByIdAndUpdate(travelModel._id, travelModel, { new: true })
   }
}

module.exports = TravelController
