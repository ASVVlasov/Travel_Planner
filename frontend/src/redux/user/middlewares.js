import { GET_USER_SUCCESS, CREATE_TRAVEL_SUCCESS } from '../types'
import { getTravelsFilter } from './actions'

export default (store) => (next) => (action) => {
   next(action)

   switch (action.type) {
      case GET_USER_SUCCESS:
      case CREATE_TRAVEL_SUCCESS: {
         store.dispatch(getTravelsFilter())
         break
      }
      default:
         break
   }
}
