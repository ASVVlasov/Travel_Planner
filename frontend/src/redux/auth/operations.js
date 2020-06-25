import { fetchRequest } from '../fetch/operations'
import {
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

export const login = (authInfo) =>
   fetchRequest.post(
      '/signin',
      [loginLoading, loginSuccess, loginError],
      authInfo
   )

export const logout = () =>
   fetchRequest.get('/logout', [null, logoutSuccess, logoutError])
