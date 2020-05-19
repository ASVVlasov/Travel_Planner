import { GET_PAYER_SUMMARY } from '../types'

export const getSummarySuccess = (summary) => ({
   type: GET_PAYER_SUMMARY,
   payload: summary,
})
