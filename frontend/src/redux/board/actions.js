import { GET_BOARD_FILTER, GET_BOARD_SUCCESS } from '../types'

export const getBoardSuccess = (tabs) => ({
   type: GET_BOARD_SUCCESS,
   payload: tabs,
})

export const getBoardFilter = (userId) => ({
   type: GET_BOARD_FILTER,
   payload: userId,
})
