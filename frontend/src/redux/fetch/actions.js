import { FETCH_LOADING, FETCH_ERROR, FETCH_ERROR_CLEAR } from '../types'

export const isLoading = () => ({
   type: FETCH_LOADING,
})

export const hadError = (err) => ({
   type: FETCH_ERROR,
   payload: err,
})

export const clearError = (errName) => ({
   type: FETCH_ERROR_CLEAR,
   payload: { [errName]: undefined },
})
