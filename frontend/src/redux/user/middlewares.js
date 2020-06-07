import { GET_USER_SUCCESS, CREATE_TRAVEL_SUCCESS } from '../types'
import { getTravelsFilter } from './actions'

function sortByTime(travels) {
   travels.sort(function (prev, next) {
      const beginD = new Date(prev.beginDate).setHours(0, 0, 0, 0)
      const endD = new Date(next.beginDate).setHours(0, 0, 0, 0)
      const beginDiff = beginD - endD
      const endDiff = new Date(prev.endDate) - new Date(next.endDate)
      return beginDiff > 0 ? 1 : beginDiff < 0 ? -1 : endDiff > 0 ? 1 : -1
   })
}

export default (store) => (next) => (action) => {
   next(action)

   switch (action.type) {
      case GET_USER_SUCCESS:
      case CREATE_TRAVEL_SUCCESS: {
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
