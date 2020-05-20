import { GET_BOARD_SUCCESS } from '../types'
import { getCards } from './actions'

export default (store) => (next) => (action) => {
   next(action)

   const state = store.getState()
   const tabId = state.router.location.pathname.split('/')[4]

   switch (action.type) {
      case GET_BOARD_SUCCESS: {
         return store.dispatch(getCards(tabId))
      }
      default:
         break
   }
}
