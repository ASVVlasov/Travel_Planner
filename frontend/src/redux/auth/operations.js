import { fetchRequest } from '../fetch/operations'
import {
   getInvitedEmailLoading,
   getInvitedEmailSuccess,
   getInvitedEmailError,
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

export const login = (authInfo) =>
   fetchRequest.post(
      '/signin',
      [loginLoading, loginSuccess, loginError],
      authInfo
   )

export const logout = () =>
   fetchRequest.get('/logout', [null, logoutSuccess, logoutError])
