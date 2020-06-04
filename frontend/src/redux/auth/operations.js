import { fetchRequest } from '../fetch/operations'
import { authorizationSuccess } from './actions'

export const authorization = (authInfo, path) =>
   fetchRequest.post(path, authorizationSuccess, authInfo)
