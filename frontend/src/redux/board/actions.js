import { GET_BOARD_LOADING, GET_BOARD_SUCCESS, FETCH_ERROR } from '../types'

export const getBoardLoading = () => ({
   type: GET_BOARD_LOADING,
})

export const getBoardSuccess = (data) => ({
   type: GET_BOARD_SUCCESS,
   payload: { ...data },
})

export const hadError = (err) => ({
   type: FETCH_ERROR,
   payload: { err },
})
