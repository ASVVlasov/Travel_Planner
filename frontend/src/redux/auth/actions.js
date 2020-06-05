import { AUTHORIZATION_SUCCESS, LOGOUT_SUCCESS } from '../types'

export const authorizationSuccess = (authInfo) => ({
   type: AUTHORIZATION_SUCCESS,
   payload: authInfo,
})

export const logoutSuccess = () => ({
   type: LOGOUT_SUCCESS,
})
