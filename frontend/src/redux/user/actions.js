import {
   GET_USER_LOADING,
   GET_USER_SUCCESS,
   GET_USER_ERROR,
   UPDATE_USER_LOADING,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_ERROR,
   USER_AVATAR_LOADING,
   USER_AVATAR_ERROR,
   GET_TRAVELS_FILTER,
   SEARCH_CONTACT_LOADING,
   SEARCH_CONTACT_SUCCESS,
   SEARCH_CONTACT_ERROR,
   UPDATE_CONTACTS_SUCCESS,
   UPDATE_CONTACTS_ERROR,
   CLEAR_CONTACTS_SEARCH,
   CLEAR_ERROR_SEARCH,
} from '../types'

export const getUserLoading = () => ({
   type: GET_USER_LOADING,
})
export const getUserSuccess = (userInfo) => ({
   type: GET_USER_SUCCESS,
   payload: userInfo,
})
export const getUserError = (err) => ({
   type: GET_USER_ERROR,
   payload: err,
})

export const updateUserLoading = () => ({
   type: UPDATE_USER_LOADING,
})
export const updateUserSuccess = (updUserInfo) => ({
   type: UPDATE_USER_SUCCESS,
   payload: updUserInfo,
})
export const updateUserError = (err) => ({
   type: UPDATE_USER_ERROR,
   payload: err,
})

export const userAvatarLoading = () => ({
   type: USER_AVATAR_LOADING,
})
export const userAvatarError = (err) => ({
   type: USER_AVATAR_ERROR,
   payload: err,
})

export const getTravelsFilter = (sortTravels) => ({
   type: GET_TRAVELS_FILTER,
   payload: sortTravels,
})

export const searchContactLoading = () => ({
   type: SEARCH_CONTACT_LOADING,
})
export const searchContactSuccess = (contact) => ({
   type: SEARCH_CONTACT_SUCCESS,
   payload: contact,
})
export const searchContactError = (err) => ({
   type: SEARCH_CONTACT_ERROR,
   payload: err,
})

export const updateContactsSuccess = (updUserInfo) => ({
   type: UPDATE_CONTACTS_SUCCESS,
   payload: updUserInfo.contacts,
})
export const updateContactsError = (err) => ({
   type: UPDATE_CONTACTS_ERROR,
   payload: err,
})

export const clearContactSearch = () => ({
   type: CLEAR_CONTACTS_SEARCH,
})
export const clearErrorSearch = () => ({
   type: CLEAR_ERROR_SEARCH,
})
