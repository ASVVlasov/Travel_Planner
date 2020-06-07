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

         let sortCards = store.getState().boardReducer.currentCards
         let activeCards = sortCards.filter(
            (card) => Date.parse(card.endDate) > new Date()
         )
         let cardsWithoutDate = sortCards.filter(
            (card) => card.endDate === null
         )
         let archivalCards = sortCards.filter(
            (card) => Date.parse(card.endDate) < new Date()
         )

         activeCards.sort(
            (prev, next) =>
               Date.parse(prev.beginDate) - Date.parse(next.beginDate)
         )
         archivalCards.sort(
            (prev, next) =>
               Date.parse(prev.beginDate) - Date.parse(next.beginDate)
         )

         sortCards = activeCards.concat(cardsWithoutDate, archivalCards)
         store.dispatch(getCardsFilter(sortCards))
         break
      }
      default:
         break
   }
}
