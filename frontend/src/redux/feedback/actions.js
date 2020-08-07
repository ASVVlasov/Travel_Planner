import { FEEDBACK_LOADING, FEEDBACK_SUCCESS, FEEDBACK_ERROR } from '../types'

export const feedbackLoading = () => ({
   type: FEEDBACK_LOADING,
})
export const feedbackSuccess = ({ message, type }) => ({
   type: FEEDBACK_SUCCESS,
   alert: { message, type },
})
export const feedbackError = (err) => ({
   type: FEEDBACK_ERROR,
   payload: err,
})
