const UserModel = require('../../models/user')
const FileController = require('../file/fileController')

class UserController {
   static async _getUserById(userId) {
      return await UserModel.findById(userId).lean()
   }
   static async getFullUserInfo(userId) {
      const user = this._getUserById(userId)
      user.contacts = []
      for (let contactId of user.contactIds) {
         user.contacts.push(await this.getShortUserInfo(contactId))
      }
      return user
   }
   static async getShortUserInfo(userId) {
      const user = await this._getUserById(userId)
      user.avatar = await FileController.getFileById(user.avatarFileId)
      return {
         _id: user._id,
         avatar: user.avatar,
         nickName: user.profile.nickName,
      }
   }
   static async getShortUsers(userIds) {
      const usersInfo = []
      for (const userId of userIds) {
         usersInfo.push(await this.getShortUserInfo(userId))
      }
      return usersInfo
   }
   static async getFullUsers(userIds) {
      const usersInfo = []
      for (const userId of userIds) {
         usersInfo.push(await this.getFullUserInfo(userId))
      }
      return usersInfo
   }
}

module.exports = UserController
