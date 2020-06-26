import { getBoardLoading, getBoardSuccess, getBoardError } from './actions'
import { fetchRequest } from '../fetch/operations'

export const getBoard = (travelId, categoryType) =>
   fetchRequest.get(`/card/${categoryType}/${travelId}`, [
      getBoardLoading,
      getBoardSuccess,
      getBoardError,
   ])
