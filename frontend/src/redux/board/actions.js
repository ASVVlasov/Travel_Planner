import { GET_BOARD_LOADING, GET_BOARD_SUCCESS, GET_BOARD_ERROR } from '../types'

export const getBoardLoading = () => ({
   type: GET_BOARD_LOADING,
})

export const getBoardSuccess = (data) => ({
   type: GET_BOARD_SUCCESS,
   payload: { ...data },
})

export const getBoardError = (err) => ({
   type: GET_BOARD_ERROR,
   payload: { err },
})
