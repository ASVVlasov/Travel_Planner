import {
   GET_BOARD_SUCCESS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   SET_TAB_FILTER,
   SET_USER_FILTER,
} from '../types'
import { getBoardFilter } from '../board/actions'

export default (store) => (next) => (action) => {
   next(action)

   switch (action.type) {
      case GET_BOARD_SUCCESS:
      case ADD_CARD_SUCCESS:
      case CHANGE_CARD_SUCCESS:
      case DELETE_CARD_SUCCESS:
      case SET_TAB_FILTER:
      case SET_USER_FILTER: {
         store.dispatch(getBoardFilter())
         break
      }
      default:
         break
   }
}
