import { GET_USER_SUCCESS } from '../types'

export const getUserSuccess = (userInfo) => ({
   type: GET_USER_SUCCESS,
   payload: userInfo,
})
