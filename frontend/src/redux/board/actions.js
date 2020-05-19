import {
   GET_BOARD_FILTER,
   GET_BOARD_LOADING,
   GET_BOARD_SUCCESS,
} from '../types'

export const getBoardLoading = () => ({
   type: GET_BOARD_LOADING,
})

export const getBoardSuccess = (tabs) => ({
   type: GET_BOARD_SUCCESS,
   payload: tabs,
})

export const getBoardFilter = (userId) => ({
   type: GET_BOARD_FILTER,
   payload: userId,
})
