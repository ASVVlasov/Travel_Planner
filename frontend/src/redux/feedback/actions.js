import { FEEDBACK_SUCCESS, FEEDBACK_ERROR } from '../types'

export const feedbackSuccess = () => ({
   type: FEEDBACK_SUCCESS,
})
export const feedbackError = (err) => ({
   type: FEEDBACK_ERROR,
   payload: { feedbackError: err.message },
})
