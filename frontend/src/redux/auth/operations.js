import { fetchRequest } from '../fetch/operations'
import {
   getInvitedEmailLoading,
   getInvitedEmailSuccess,
   getInvitedEmailError,
   emailConfirmationLoading,
   emailConfirmationSuccess,
   emailConfirmationError,
   passwordChangeRequestLoading,
   passwordChangeRequestSuccess,
   passwordChangeRequestError,
   getEmailPasswordChangeLoading,
   getEmailPasswordChangeSuccess,
   getEmailPasswordChangeError,
   passwordChangeLoading,
   passwordChangeSuccess,
   passwordChangeError,
   regLoading,
   regSuccess,
   regError,
   loginLoading,
   loginSuccess,
   loginError,
   logoutSuccess,
   logoutError,
} from './actions'

export const register = (newUser) =>
   fetchRequest.post('/signup', [regLoading, regSuccess, regError], newUser)

export const registerByInvitation = (newUser) =>
   fetchRequest.post(
      '/signup/' + newUser.linkId,
      [regLoading, regSuccess, regError],
      {
         password: newUser.password,
      }
   )

export const getInvitedEmail = (linkId) =>
   fetchRequest.get('/signup/' + linkId, [
      getInvitedEmailLoading,
      getInvitedEmailSuccess,
      getInvitedEmailError,
   ])

export const emailConfirmation = (linkId) =>
   fetchRequest.post('/signin/' + linkId, [
      emailConfirmationLoading,
      emailConfirmationSuccess,
      emailConfirmationError,
   ])

export const login = (authInfo) =>
   fetchRequest.post(
      '/signin',
      [loginLoading, loginSuccess, loginError],
      authInfo
   )

export const logout = () =>
   fetchRequest.get('/logout', [null, logoutSuccess, logoutError])

export const passwordChangeRequest = (email) =>
   fetchRequest.post(
      '/auth/forgot',
      [
         passwordChangeRequestLoading,
         passwordChangeRequestSuccess,
         passwordChangeRequestError,
      ],
      {
         email: email,
      }
   )

export const getEmailPasswordChange = (linkId) =>
   fetchRequest.get('/auth/signup/' + linkId, [
      getEmailPasswordChangeLoading,
      getEmailPasswordChangeSuccess,
      getEmailPasswordChangeError,
   ])

export const passwordChange = (linkIdAndPassword) =>
   fetchRequest.post(
      '/auth/signup/' + linkIdAndPassword.linkId,
      [passwordChangeLoading, passwordChangeSuccess, passwordChangeError],
      {
         password: linkIdAndPassword.password,
      }
   )
