import {
   GET_CARDS,
   CHANGE_CARD_SUCCESS,
   CHANGE_CARD_ERROR,
   DELETE_CARD_SUCCESS,
   DELETE_CARD_ERROR,
} from '../types'

export const getCards = (activeTabId) => ({
   type: GET_CARDS,
   payload: { activeTabId },
})

export const changeCardSuccess = (updCard) => ({
   type: CHANGE_CARD_SUCCESS,
   payload: { updCard },
})

export const changeCardError = (err) => ({
   type: CHANGE_CARD_ERROR,
   payload: { err },
})

export const deleteCardSuccess = (cardId) => ({
   type: DELETE_CARD_SUCCESS,
   payload: { cardId },
})

export const deleteCardError = (err) => ({
   type: DELETE_CARD_ERROR,
   payload: { err },
})
