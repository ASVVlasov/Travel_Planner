import {
   GET_PAYER_SUMMARY,
   GET_TRAVEL_SUCCESS,
   CHANGE_TRAVEL_SUCCESS,
} from '../types'

export const getSummarySuccess = (summary) => ({
   type: GET_PAYER_SUMMARY,
   payload: summary,
})

export const getTravelSuccess = (data) => ({
   type: GET_TRAVEL_SUCCESS,
   payload: { ...data },
})
export const changeTravelSuccess = (updTravel) => ({
   type: CHANGE_TRAVEL_SUCCESS,
   payload: { ...updTravel },
})
