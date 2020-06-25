import { fetchRequest } from '../fetch/operations'
import {
   regSuccess,
   regError,
   loginSuccess,
   loginError,
   logoutSuccess,
   logoutError,
} from './actions'

export const register = (newUser) =>
   fetchRequest.post('/signup', [regSuccess, regError], newUser)

export const registerByInvitation = (newUser) =>
   fetchRequest.post('/signup/' + newUser.linkId, [regSuccess, regError], {
      password: newUser.password,
   })

export const login = (authInfo) =>
   fetchRequest.post('/signin', [loginSuccess, loginError], authInfo)

export const logout = () =>
   fetchRequest.get('/logout', [logoutSuccess, logoutError])
