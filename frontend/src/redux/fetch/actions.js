import { FETCH_LOADING, FETCH_ERROR } from '../types'

export const isLoading = () => ({
   type: FETCH_LOADING,
})

export const hadError = (err) => ({
   type: FETCH_ERROR,
   payload: err,
})
