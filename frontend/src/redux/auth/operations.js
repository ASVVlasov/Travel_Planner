import { fetchRequest } from '../fetch/operations'
import {
   regSuccess,
   regError,
   loginSuccess,
   loginError,
   logoutSuccess,
} from './actions'

export const register = (newUser) =>
   fetchRequest.post('/signup', [regSuccess, regError], newUser)

export const login = (authInfo) =>
   fetchRequest.post('/signin', [loginSuccess, loginError], authInfo)

export const logout = () => fetchRequest.get('/logout', [logoutSuccess])
