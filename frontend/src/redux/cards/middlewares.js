import {
   GET_BOARD_SUCCESS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
} from '../types'
import { getCards } from './actions'
import { getBoardFilter } from '../board/actions'

export default (store) => (next) => (action) => {
   next(action)

   const state = store.getState()
   const tabId = state.router.location.pathname.split('/')[4]
   const USER_ID = '5eb9af4dc82bd95234d9ccd6' //TODO get real user id

   switch (action.type) {
      case GET_BOARD_SUCCESS:
      case ADD_CARD_SUCCESS:
      case CHANGE_CARD_SUCCESS:
      case DELETE_CARD_SUCCESS: {
         state.boardReducer.isFiltered
            ? store.dispatch(getBoardFilter(USER_ID))
            : store.dispatch(getCards(tabId))
         break
      }
      default:
         break
   }
}
