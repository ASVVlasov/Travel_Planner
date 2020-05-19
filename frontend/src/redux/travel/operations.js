import { getSummarySuccess } from './actions'

import { fetchRequest } from '../fetch/operations'
import { hadError } from '../fetch/actions'
import {
   getTravelLoading,
   getTravelSuccess,
   changeTravelTitleSuccess,
   changeTravelDateSuccess,
} from './actions'

const MAIN_URL = '/travel/'

export const getSummary = (travelId) =>
   fetchRequest.get('/card/payer/summary/' + travelId, getSummarySuccess)

export const getTravel = (travelId) => async (dispatch) => {
   dispatch(getTravelLoading())

   try {
      const res = await fetch(`/travel/${travelId}`)

      if (!res.ok) {
         throw new Error(res.statusText)
      }

      const data = await res.json()
      dispatch(getTravelSuccess(data))
   } catch (err) {
      dispatch(hadError(err))
   }
}

export const changeTravelTitle = (title) =>
   // fetchRequest('PUT', '/travel/', changeTravelTitleSuccess, JSON.stringify(title))
   fetchRequest.put(MAIN_URL, changeTravelTitleSuccess, title)

export const changeTravelDate = (date) =>
   // fetchRequest('PUT', '/travel/', changeTravelDateSuccess, JSON.stringify(date))
   fetchRequest.put(MAIN_URL, changeTravelDateSuccess, date)
