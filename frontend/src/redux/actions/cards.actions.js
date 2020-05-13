import {
   GET_CARDS,
   DELETE_CARD_SUCCESS,
   DELETE_CARD_ERROR,
   CHANGE_CARD_SUCCESS,
   CHANGE_CARD_ERROR,
} from './types'

export const getCards = (activeTabId) => ({
   type: GET_CARDS,
   payload: { activeTabId },
})

export const deleteCard = (travelId, cardId) => {
   return (dispatch) =>
      fetch(`/card/${travelId}/${cardId}`, {
         method: 'DELETE',
      })
         .then((res) => {
            res.ok
               ? dispatch(deleteCardSuccess(cardId))
               : dispatch(deleteCardError(res.statusText))
         })
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

export const changeCard = (travelId, card) => {
   return (dispatch) =>
      fetch('/card/', {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body: JSON.stringify({ travelId, card }),
      })
         .then((res) => {
            if (res.ok) {
               return res.json()
            }
            throw new Error(res.statusText)
         })
         .then((card) => dispatch(changeCardSuccess(card)))
         .catch((err) => dispatch(changeCardError(err)))
}

const changeCardSuccess = (updCard) => ({
   type: CHANGE_CARD_SUCCESS,
   payload: { updCard },
})
const changeCardError = (err) => ({
   type: CHANGE_CARD_ERROR,
   payload: { err },
})
