import {
   getUserSuccess,
   updateUserSuccess,
   searchContactSuccess,
   updateContactsSuccess,
} from './actions'
import { fetchRequest } from '../fetch/operations'

const MAIN_URL = '/user'
const AVATAR_URL = MAIN_URL + '/avatar'
const CONTACT_URL = MAIN_URL + '/contact'

export const getUserInfo = () => fetchRequest.get(MAIN_URL, [getUserSuccess])

export const updateUserInfo = (updateFields) =>
   fetchRequest.put(MAIN_URL, [updateUserSuccess], updateFields)

export const uploadAvatar = (file) =>
   fetchRequest.uploadFile(AVATAR_URL, [updateUserSuccess], file)

export const deleteAvatar = () =>
   fetchRequest.delete(AVATAR_URL, [updateUserSuccess], {})

export const searchContact = (email) =>
   fetchRequest.post(CONTACT_URL + '/search', [searchContactSuccess], email)

export const addContact = (contactId) =>
   fetchRequest.post(CONTACT_URL, [updateContactsSuccess], contactId)

export const deleteContact = (contactId) =>
   fetchRequest.delete(CONTACT_URL, [updateContactsSuccess], contactId)
