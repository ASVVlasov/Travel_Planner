import {
   GET_TAB_CARDS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   GET_CARDS_FILTER,
} from '../types'

export const getCards = (activeTabId) => ({
   type: GET_TAB_CARDS,
   payload: activeTabId,
})

export const createCardSuccess = (newCard) => ({
   type: ADD_CARD_SUCCESS,
   payload: newCard,
})

export const changeCardSuccess = (updCard) => ({
   type: CHANGE_CARD_SUCCESS,
   payload: updCard,
})

export const deleteCardSuccess = (delCard) => ({
   type: DELETE_CARD_SUCCESS,
   payload: delCard._id,
})

export const getCardsFilter = (sortCards) => ({
   type: GET_CARDS_FILTER,
   payload: sortCards,
})
