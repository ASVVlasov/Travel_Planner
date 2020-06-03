import { GET_USER_SUCCESS, CREATE_TRAVEL_SUCCESS } from '../types'
import { getTravelsFilter } from './actions'

export default (store) => (next) => (action) => {
   next(action)

   switch (action.type) {
      case GET_USER_SUCCESS:
      case CREATE_TRAVEL_SUCCESS: {
         const sortTravels = store.getState().userReducer.travels
         sortTravels.sort(
            (prev, next) =>
               Date.parse(prev.beginDate) - Date.parse(next.beginDate)
         )
         let today = new Date()
         let unsorted = sortTravels.length - 1
         for (let i = 0; i < unsorted; i++) {
            while (Date.parse(sortTravels[i].endDate) < today) {
               sortTravels.push(sortTravels[i])
               sortTravels.splice(i, 1)
               unsorted--
            }
         }

         store.dispatch(getTravelsFilter(sortTravels))
         break
      }
      default:
         break
   }
}
