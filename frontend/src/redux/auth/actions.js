import {
   GET_INVITED_EMAIL_LOADING,
   GET_INVITED_EMAIL_SUCCESS,
   GET_INVITED_EMAIL_ERROR,
   REGISTRATION_LOADING,
   REGISTRATION_SUCCESS,
   REGISTRATION_ERROR,
   LOGIN_LOADING,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   LOGOUT_SUCCESS,
   LOGOUT_ERROR,
   UNAUTHORIZED,
} from '../types'

export const getInvitedEmailLoading = () => ({
   type: GET_INVITED_EMAIL_LOADING,
})
export const getInvitedEmailSuccess = (email) => ({
   type: GET_INVITED_EMAIL_SUCCESS,
   payload: email,
})
export const getInvitedEmailError = (err) => ({
   type: GET_INVITED_EMAIL_ERROR,
   payload: err,
})

export const regLoading = () => ({
   type: REGISTRATION_LOADING,
})
export const regSuccess = () => ({
   type: REGISTRATION_SUCCESS,
})
export const regError = (err) => ({
   type: REGISTRATION_ERROR,
   payload: err,
})

export const loginLoading = () => ({
   type: LOGIN_LOADING,
})
export const loginSuccess = () => ({
   type: LOGIN_SUCCESS,
   payload: { auth: true },
})
export const loginError = (err) => ({
   type: LOGIN_ERROR,
   payload: err,
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
