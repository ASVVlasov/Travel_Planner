import {
   GET_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   GET_TRAVELS_FILTER,
   SEARCH_CONTACT_SUCCESS,
   UPDATE_CONTACTS_SUCCESS,
   CLEAR_CONTACTS_SEARCH,
} from '../types'

export const getUserSuccess = (userInfo) => ({
   type: GET_USER_SUCCESS,
   payload: userInfo,
})

export const updateUserSuccess = (updUserInfo) => ({
   type: UPDATE_USER_SUCCESS,
   payload: updUserInfo,
})

export const getTravelsFilter = (sortTravels) => ({
   type: GET_TRAVELS_FILTER,
   payload: sortTravels,
})

export const searchContactSuccess = (contact) => ({
   type: SEARCH_CONTACT_SUCCESS,
   payload: contact,
})

export const updateContactsSuccess = (updUserInfo) => ({
   type: UPDATE_CONTACTS_SUCCESS,
   payload: updUserInfo.contacts,
})

export const clearContactSearch = () => ({
   type: CLEAR_CONTACTS_SEARCH,
})
