import {
   ADD_CARD_LOADING,
   ADD_CARD_SUCCESS,
   ADD_CARD_ERROR,
   CHANGE_CARD_LOADING,
   CHANGE_CARD_SUCCESS,
   CHANGE_CARD_ERROR,
   DELETE_CARD_SUCCESS,
   DELETE_CARD_ERROR,
   CARD_FILE_LOADING,
   CARD_FILE_ERROR,
   ADD_PAYER_LOADING,
   ADD_PAYER_ERROR,
   DELETE_PAYER_LOADING,
   DELETE_PAYER_ERROR,
   SET_PAYER_LOADING,
   SET_PAYER_ERROR,
   GET_CARDS_FILTER,
} from '../types'

export const createCardLoading = () => ({
   type: ADD_CARD_LOADING,
})
export const createCardSuccess = ({ data: newCard }) => ({
   type: ADD_CARD_SUCCESS,
   payload: newCard,
})
export const createCardError = (err) => ({
   type: ADD_CARD_ERROR,
   payload: err,
})

export const changeCardLoading = () => ({
   type: CHANGE_CARD_LOADING,
})
export const changeCardSuccess = ({ data: updCard }) => ({
   type: CHANGE_CARD_SUCCESS,
   payload: updCard,
})
export const changeCardError = (err) => ({
   type: CHANGE_CARD_ERROR,
   payload: err,
})

export const deleteCardSuccess = ({ data: delCard }) => ({
   type: DELETE_CARD_SUCCESS,
   payload: delCard._id,
})
export const deleteCardError = (err) => ({
   type: DELETE_CARD_ERROR,
   payload: err,
})

export const cardFileLoading = () => ({
   type: CARD_FILE_LOADING,
})
export const cardFileError = () => ({
   type: CARD_FILE_ERROR,
})

export const addPayerLoading = () => ({
   type: ADD_PAYER_LOADING,
})
export const addPayerError = (err) => ({
   type: ADD_PAYER_ERROR,
   payload: err,
})

export const deletePayerLoading = () => ({
   type: DELETE_PAYER_LOADING,
})
export const deletePayerError = (err) => ({
   type: DELETE_PAYER_ERROR,
   payload: err,
})

export const setPayerLoading = () => ({
   type: SET_PAYER_LOADING,
})
export const setPayerError = (err) => ({
   type: SET_PAYER_ERROR,
   payload: err,
})

export const getCardsFilter = (sortCards) => ({
   type: GET_CARDS_FILTER,
   payload: sortCards,
})
