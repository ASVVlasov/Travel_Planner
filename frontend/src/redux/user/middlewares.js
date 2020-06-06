import { GET_USER_SUCCESS, CREATE_TRAVEL_SUCCESS } from '../types'
import { getTravelsFilter } from './actions'

export default (store) => (next) => (action) => {
   next(action)

   switch (action.type) {
      case GET_USER_SUCCESS:
      case CREATE_TRAVEL_SUCCESS: {
         function sortByTime(travels) {
            travels.sort(function (prev, next) {
               let a = Math.round(
                  new Date(prev.beginDate) / (24 * 60 * 60 * 1000) //start date of trip as number of days from 1970.
               )
               let b = Math.round(
                  new Date(next.beginDate) / (24 * 60 * 60 * 1000)
               )

               if (a > b) {
                  return 1
               }
               if (
                  //if there are trips starting on the same day, they are compared by end date
                  a === b &&
                  new Date(prev.endDate).getDate() <
                     new Date(next.endDate).getDate()
               ) {
                  return -1
               }
               if (a < b) {
                  return -1
               }
               return 0
            })
            return travels
         }

         let sortTravels = store.getState().userReducer.user.travels

         let activeTravels = sortTravels.filter(
            (travel) => travel.status === 'АКТИВНАЯ'
         )
         let archivalTravels = sortTravels.filter(
            (travel) => travel.status === 'АРХИВНАЯ'
         )

         sortByTime(activeTravels)
         sortByTime(archivalTravels)
         sortTravels = activeTravels.concat(archivalTravels)

         store.dispatch(getTravelsFilter(sortTravels))
         break
      }
      default:
         break
   }
}
