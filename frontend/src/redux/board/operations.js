import { getBoardSuccess } from './actions'
import { getCards } from '../cards/actions'
import { isLoading, hadError } from '../fetch/actions'

export const getBoard = (travelId, categoryType, tabId) => async (dispatch) => {
   dispatch(isLoading())

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
