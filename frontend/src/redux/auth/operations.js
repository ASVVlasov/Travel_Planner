import { fetchRequest } from '../fetch/operations'
import { authorizationSuccess, logoutSuccess } from './actions'

export const authorization = (authInfo, path) =>
   fetchRequest.post(path, authorizationSuccess, authInfo)

export const logout = () => fetchRequest.get('/logout', logoutSuccess)
