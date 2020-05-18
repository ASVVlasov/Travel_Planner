import { GET_TRAVEL_DATE, GET_TRAVEL_TITLE } from './types'

export function getTravelDate(travelId) {
   console.log('getTravelDate(travelId)', travelId)
   return async (dispatch) => {
      const response = await fetch(`/travel/${travelId}`)
      const json = await response.json()
      dispatch({ type: GET_TRAVEL_DATE, payload: json })
   }
}

export function getTravelTitle(travelId) {
   console.log('getTravelTitle(travelId)', travelId)
   return async (dispatch) => {
      const response = await fetch(`/travel/${travelId}`)
      const json = await response.json()
      dispatch({ type: GET_TRAVEL_TITLE, payload: json })
   }
}
