import { AUTHORIZATION_SUCCESS } from '../types'

export const authorizationSuccess = (authInfo) => ({
   type: AUTHORIZATION_SUCCESS,
   payload: authInfo,
})
