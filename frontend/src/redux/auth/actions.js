import {
   REGISTRATION_SUCCESS,
   REGISTRATION_ERROR,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   LOGOUT_SUCCESS,
   LOGOUT_ERROR,
   UNAUTHORIZED,
} from '../types'

export const regSuccess = () => ({
   type: REGISTRATION_SUCCESS,
})
export const regError = (err) => ({
   type: REGISTRATION_ERROR,
   payload: { regError: err.message },
})

export const loginSuccess = () => ({
   type: LOGIN_SUCCESS,
   payload: { auth: true },
})
export const loginError = (err) => ({
   type: LOGIN_ERROR,
   payload: { authError: err.message },
})

export const logoutSuccess = () => ({
   type: LOGOUT_SUCCESS,
   payload: { auth: false },
})
export const logoutError = () => ({
   type: LOGOUT_ERROR,
   payload: { auth: true },
})

export const authError = () => ({
   type: UNAUTHORIZED,
   payload: { auth: false },
})
