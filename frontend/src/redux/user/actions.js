import {
   GET_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   GET_TRAVELS_FILTER,
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
