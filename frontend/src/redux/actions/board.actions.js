import { GET_BOARD_LOADING, GET_BOARD_SUCCESS, GET_BOARD_ERROR } from './types'
import { getCards } from './cards.actions'

export const getBoard = (travelId, categoryType, activeTabId) => {
   return (dispatch) => {
      dispatch(getBoardLoading())

      fetch(`/travel/${categoryType}/${travelId}`)
         .then((res) => {
            if (res.ok) {
               return res.json()
            }
            throw new Error(res.statusText)
         })
         .then((data) => {
            dispatch(getBoardSuccess(data))
            dispatch(getCards(activeTabId))
         })
         .catch((err) => dispatch(getBoardError(err)))
   }
}

const getBoardLoading = () => ({
   type: GET_BOARD_LOADING,
})

const getBoardSuccess = (data) => ({
   type: GET_BOARD_SUCCESS,
   payload: { ...data },
})

const getBoardError = (err) => ({
   type: GET_BOARD_ERROR,
   payload: { err },
})
