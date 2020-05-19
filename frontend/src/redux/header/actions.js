import {
   GET_HEADER_LOADING,
   GET_HEADER_SUCCESS,
   CHANGE_TRAVEL_DATE_SUCCESS,
   CHANGE_TRAVEL_TITLE_SUCCESS,
} from '../types'

export const getHeaderLoading = () => ({
   type: GET_HEADER_LOADING,
})

export const getHeaderSuccess = (data) => ({
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
