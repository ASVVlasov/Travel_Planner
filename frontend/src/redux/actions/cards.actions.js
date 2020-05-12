import { GET_CARDS, DELETE_CARD_SUCCESS, DELETE_CARD_ERROR } from './types'

export const getCards = (activeTabId) => ({
   type: GET_CARDS,
   payload: { activeTabId },
})

export const deleteCard = (travelId, cardId) => {
   return (dispatch) =>
      fetch(`/card/${travelId}/${cardId}`, {
         method: 'DELETE',
      })
         .then(
            (res) => {
               res.ok
                  ? dispatch(deleteCardSuccess(cardId))
                  : dispatch(deleteCardError(res.statusText))
            },
            (err) => dispatch(deleteCardError(err))
         )
         .catch((err) => dispatch(deleteCardError(err)))
}

const deleteCardSuccess = (cardId) => ({
   type: DELETE_CARD_SUCCESS,
   payload: { cardId },
})

const deleteCardError = (err) => ({
   type: DELETE_CARD_ERROR,
   payload: { err },
})
