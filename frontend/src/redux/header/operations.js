import { fetchRequest } from '../fetch/operations'
import { hadError } from '../fetch/actions'
import {
   getHeaderLoading,
   getHeaderSuccess,
   changeTravelTitleSuccess,
   changeTravelDateSuccess,
} from './actions'

const MAIN_URL = '/travel/'

export const getHeader = (travelId) => async (dispatch) => {
   dispatch(getHeaderLoading())

   try {
      const res = await fetch(`/travel/${travelId}`)

      if (!res.ok) {
         throw new Error(res.statusText)
      }

      const data = await res.json()
      dispatch(getHeaderSuccess(data))
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
