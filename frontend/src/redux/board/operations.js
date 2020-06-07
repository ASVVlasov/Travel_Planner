import { getBoardSuccess } from './actions'
import { fetchRequest } from '../fetch/operations'

export const getBoard = (travelId, categoryType) =>
   fetchRequest.get(`/card/${categoryType}/${travelId}`, [getBoardSuccess])
