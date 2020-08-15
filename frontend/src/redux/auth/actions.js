import {
   GET_INVITED_EMAIL_LOADING,
   GET_INVITED_EMAIL_SUCCESS,
   GET_INVITED_EMAIL_ERROR,
   EMAIL_CONFIRMATION_LOADING,
   EMAIL_CONFIRMATION_SUCCESS,
   EMAIL_CONFIRMATION_ERROR,
   REGISTRATION_LOADING,
   REGISTRATION_SUCCESS,
   REGISTRATION_ERROR,
   LOGIN_LOADING,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   LOGOUT_SUCCESS,
   LOGOUT_ERROR,
   UNAUTHORIZED,
   PASSWORD_CHANGE_REQUEST_LOADING,
   PASSWORD_CHANGE_REQUEST_SUCCESS,
   PASSWORD_CHANGE_REQUEST_ERROR,
   PASSWORD_CHANGE_LOADING,
   PASSWORD_CHANGE_SUCCESS,
   PASSWORD_CHANGE_ERROR,
   GET_EMAIL_PASSWORD_CHANGE_LOADING,
   GET_EMAIL_PASSWORD_CHANGE_SUCCESS,
   GET_EMAIL_PASSWORD_CHANGE_ERROR,
} from '../types'

export const getInvitedEmailLoading = () => ({
   type: GET_INVITED_EMAIL_LOADING,
})
export const getInvitedEmailSuccess = ({ data: email }) => ({
   type: GET_INVITED_EMAIL_SUCCESS,
   payload: email,
})
export const getInvitedEmailError = (err) => ({
   type: GET_INVITED_EMAIL_ERROR,
   payload: err,
})

export const emailConfirmationLoading = () => ({
   type: EMAIL_CONFIRMATION_LOADING,
})
export const emailConfirmationSuccess = ({ data: user, message, type }) => ({
   type: EMAIL_CONFIRMATION_SUCCESS,
   payload: user,
   alert: { type, message },
})
export const emailConfirmationError = (err) => ({
   type: EMAIL_CONFIRMATION_ERROR,
   payload: err,
})

export const regLoading = () => ({
   type: REGISTRATION_LOADING,
})
export const regSuccess = ({ type, message }) => ({
   type: REGISTRATION_SUCCESS,
   alert: { type, message },
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

export const passwordChangeRequestLoading = () => ({
   type: PASSWORD_CHANGE_REQUEST_LOADING,
})
export const passwordChangeRequestSuccess = ({ type, message }) => ({
   type: PASSWORD_CHANGE_REQUEST_SUCCESS,
   alert: { type, message },
})
export const passwordChangeRequestError = (err) => ({
   type: PASSWORD_CHANGE_REQUEST_ERROR,
   payload: err,
})

export const getEmailPasswordChangeLoading = () => ({
   type: GET_EMAIL_PASSWORD_CHANGE_LOADING,
})
export const getEmailPasswordChangeSuccess = (email) => ({
   type: GET_EMAIL_PASSWORD_CHANGE_SUCCESS,
   payload: email,
})
export const getEmailPasswordChangeError = (err) => ({
   type: GET_EMAIL_PASSWORD_CHANGE_ERROR,
   payload: err,
})

export const passwordChangeLoading = () => ({
   type: PASSWORD_CHANGE_LOADING,
})
export const passwordChangeSuccess = ({ type, message }) => ({
   type: PASSWORD_CHANGE_SUCCESS,
   alert: { type, message },
})
export const passwordChangeError = (err) => ({
   type: PASSWORD_CHANGE_ERROR,
   payload: err,
})
