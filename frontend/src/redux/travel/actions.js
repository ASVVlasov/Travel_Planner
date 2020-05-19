import {
   GET_PAYER_SUMMARY,
   GET_HEADER_LOADING,
   GET_HEADER_SUCCESS,
   CHANGE_TRAVEL_DATE_SUCCESS,
   CHANGE_TRAVEL_TITLE_SUCCESS,
} from '../types'

export const getSummarySuccess = (summary) => ({
   type: GET_PAYER_SUMMARY,
   payload: summary,
})
export const getTravelLoading = () => ({
   type: GET_HEADER_LOADING,
})

export const getTravelSuccess = (data) => ({
   type: GET_HEADER_SUCCESS,
   payload: { ...data },
})

export const changeTravelDateSuccess = (updDate) => ({
   type: CHANGE_TRAVEL_DATE_SUCCESS,
   payload: updDate,
})

export const changeTravelTitleSuccess = (updTitle) => ({
   type: CHANGE_TRAVEL_TITLE_SUCCESS,
   payload: updTitle,
})
