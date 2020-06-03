import {
   GET_BOARD_SUCCESS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   SET_TAB_FILTER,
   SET_USER_FILTER,
} from '../types'
import { getBoardFilter } from '../board/actions'
import { getCardsFilter } from './actions'

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

         const sortCards = store.getState().boardReducer.cards
         sortCards.sort(
            (prev, next) =>
               Date.parse(prev.beginDate) - Date.parse(next.beginDate)
         )
         let today = new Date()
         let unsorted = sortCards.length - 1
         for (let i = 0; i < unsorted; i++) {
            while (Date.parse(sortCards[i].endDate) < today) {
               sortCards.push(sortCards[i])
               sortCards.splice(i, 1)
               unsorted--
            }
         }

         store.dispatch(getCardsFilter(sortCards))
         break
      }
      default:
         break
   }
}
