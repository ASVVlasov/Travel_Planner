import {
   GET_BUDGET_LOADING,
   GET_BUDGET_SUCCESS,
   GET_BUDGET_ERROR,
   GET_TRAVEL_LOADING,
   GET_TRAVEL_SUCCESS,
   GET_TRAVEL_ERROR,
   CHANGE_TRAVEL_LOADING,
   CHANGE_TRAVEL_SUCCESS,
   CHANGE_TRAVEL_ERROR,
   CREATE_TRAVEL_LOADING,
   CREATE_TRAVEL_SUCCESS,
   CREATE_TRAVEL_ERROR,
   DELETE_TRAVEL_LOADING,
   DELETE_TRAVEL_SUCCESS,
   DELETE_TRAVEL_ERROR,
} from '../types'

export const getBudgetLoading = () => ({
   type: GET_BUDGET_LOADING,
})
export const getBudgetSuccess = ({ data: summary }) => ({
   type: GET_BUDGET_SUCCESS,
   payload: summary,
})
export const getBudgetError = (err) => ({
   type: GET_BUDGET_ERROR,
   payload: err,
})

export const getTravelLoading = () => ({
   type: GET_TRAVEL_LOADING,
})
export const getTravelSuccess = ({ data }) => ({
   type: GET_TRAVEL_SUCCESS,
   payload: { ...data },
})
export const getTravelError = (err) => ({
   type: GET_TRAVEL_ERROR,
   payload: err,
})

export const changeTravelLoading = () => ({
   type: CHANGE_TRAVEL_LOADING,
})
export const changeTravelSuccess = ({ data: updTravel, ...alert }) => ({
   type: CHANGE_TRAVEL_SUCCESS,
   payload: { ...updTravel },
   alert,
})
export const changeTravelError = (err) => ({
   type: CHANGE_TRAVEL_ERROR,
   payload: err,
})

export const createTravelLoading = () => ({
   type: CREATE_TRAVEL_LOADING,
})
export const createTravelSuccess = ({ data: newTravel }) => ({
   type: CREATE_TRAVEL_SUCCESS,
   payload: newTravel,
})
export const createTravelError = (err) => ({
   type: CREATE_TRAVEL_ERROR,
   payload: err,
})

export const deleteTravelLoading = () => ({
   type: DELETE_TRAVEL_LOADING,
})
export const deleteTravelSuccess = ({ data: delTravel }) => ({
   type: DELETE_TRAVEL_SUCCESS,
   payload: delTravel,
})
export const deleteTravelError = (err) => ({
   type: DELETE_TRAVEL_ERROR,
   payload: err,
})
