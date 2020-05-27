import { getUserSuccess, updateUserSuccess } from './actions'
import { fetchRequest } from '../fetch/operations'

export const getUserInfo = () => fetchRequest.get('/user/', getUserSuccess)

export const updateUserInfo = (updateFields) =>
   fetchRequest.put('/user/', updateUserSuccess, updateFields)

export const uploadAvatar = (file) =>
   fetchRequest.uploadFile('/user/avatar', updateUserSuccess, file)
