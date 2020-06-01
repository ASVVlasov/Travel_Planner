import {
   GET_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   SEARCH_CONTACT_SUCCESS,
   UPDATE_CONTACTS_SUCCESS,
} from '../types'

export const getUserSuccess = (userInfo) => ({
   type: GET_USER_SUCCESS,
   payload: userInfo,
})

export const updateUserSuccess = (updUserInfo) => ({
   type: UPDATE_USER_SUCCESS,
   payload: updUserInfo,
})

export const searchContactSuccess = (contact) => ({
   type: SEARCH_CONTACT_SUCCESS,
   payload: contact,
})

export const updateContactsSuccess = (updUserInfo) => ({
   type: UPDATE_CONTACTS_SUCCESS,
   payload: updUserInfo.contacts,
})
