import {
   GET_PAYER_BUDGET,
   GET_TRAVEL_SUCCESS,
   CHANGE_TRAVEL_SUCCESS,
} from '../types'

export const getBudgetSuccess = (summary) => ({
   type: GET_PAYER_BUDGET,
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
