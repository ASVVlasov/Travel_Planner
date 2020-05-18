import { getBoardLoading, getBoardSuccess } from './actions'
import { getCards } from '../cards/actions'
import { hadError } from '../fetch/actions'

export const getBoard = (travelId, categoryType, tabId) => async (dispatch) => {
   dispatch(getBoardLoading())

   try {
      const res = await fetch(`/card/${categoryType}/${travelId}`)

      if (!res.ok) {
         throw new Error(res.statusText)
      }

      const data = await res.json()
      dispatch(getBoardSuccess(data))
      dispatch(getCards(tabId))
   } catch (err) {
      dispatch(hadError(err))
   }
}
