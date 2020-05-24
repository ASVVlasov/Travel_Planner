import { getUserSuccess } from './actions'
import { fetchRequest } from '../fetch/operations'

export const getUserInfo = () => fetchRequest.get('/user/', getUserSuccess)
