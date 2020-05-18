import { GET_BOARD_LOADING, GET_BOARD_SUCCESS } from '../types'

export const getBoardLoading = () => ({
   type: GET_BOARD_LOADING,
})

export const getBoardSuccess = (tabs) => ({
   type: GET_BOARD_SUCCESS,
   payload: tabs,
})
