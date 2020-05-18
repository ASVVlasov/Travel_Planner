import {
   GET_HEADER_LOADING,
   GET_HEADER_SUCCESS,
   GET_HEADER_ERROR,
   CHANGE_TRAVEL_DATE_SUCCESS,
   CHANGE_TRAVEL_TITLE_SUCCESS,
} from '../types'

export function getHeader(travelId) {
   return (dispatch) => {
      dispatch(getHeaderLoading())

      fetch(`/travel/${travelId}`)
         .then((res) => {
            if (res.ok) {
               return res.json()
            }
            throw new Error(res.statusText)
         })
         .then((data) => {
            dispatch(getHeaderSuccess(data))
         })
         .catch((err) => dispatch(getHeaderError(err)))
   }
}

const getHeaderLoading = () => ({
   type: GET_HEADER_LOADING,
})

const getHeaderSuccess = (data) => ({
   type: GET_HEADER_SUCCESS,
   payload: { ...data },
})

const getHeaderError = (err) => ({
   type: GET_HEADER_ERROR,
   payload: { err },
})

export function changeTravelDate(beginDate, endDate) {
   return (dispatch) => {
      dispatch({
         type: CHANGE_TRAVEL_DATE_SUCCESS,
         payload: { beginDate, endDate },
      })
   }
}

export function changeTravelTitle(title) {
   return (dispatch) => {
      dispatch({
         type: CHANGE_TRAVEL_TITLE_SUCCESS,
         payload: { title },
      })
   }
}
