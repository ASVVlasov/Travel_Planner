import { FETCH_ERROR } from '../types'

export const hadError = (err) => ({
   type: FETCH_ERROR,
   payload: err,
})
