const UserModel = require('../../models/user')
const TravelModel = require('../../models/travel')
const FileController = require('../file/fileController')
const TravelController = require('../travel/travelController')

class UserController {
   static async _getUserById(userId) {
      return await UserModel.findById(userId).lean()
   }
   static getFullUserInfo(userId) {
      const user = this._getUserById(userId)
      user.contacts = []
      for (let contactId of user.contactIds) {
         user.contacts.push(this.getShortUserInfo(contactId))
      }
      user.travels = []
      for (let travelId of user.travelIds) {
         user.travels.push(TravelController.getShortTravelInfo(travelId))
      }
      return user
   }
   static async getShortUserInfo(userId) {
      const user = await this._getUserById(userId)
      user.avatar = await FileController.getFileById(user.avatarFileId)
      return user
   }
   static async getShortUsers(userIds) {
      const usersInfo = []
      for (const userId of userIds) {
         usersInfo.push(await this.getShortUserInfo(userId))
      }
      return usersInfo
   }
}

module.exports = UserController
