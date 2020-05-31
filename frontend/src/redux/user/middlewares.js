import { GET_USER_SUCCESS } from '../types'
import { getTravelsFilter } from './actions'

export default (store) => (next) => (action) => {
   next(action)

   switch (action.type) {
      case GET_USER_SUCCESS: {
         store.dispatch(getTravelsFilter())
         break
      }
      default:
         break
   }
}
