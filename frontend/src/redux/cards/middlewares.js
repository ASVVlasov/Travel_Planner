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

function sortByTime(cards) {
   cards.sort(function (prev, next) {
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
      case GET_BOARD_SUCCESS:
      case ADD_CARD_SUCCESS:
      case CHANGE_CARD_SUCCESS:
      case DELETE_CARD_SUCCESS:
      case SET_TAB_FILTER:
      case SET_USER_FILTER: {
         store.dispatch(getBoardFilter())

         let sortCards = store.getState().boardReducer.currentCards
         const activeCards = sortCards.filter(
            (card) => Date.parse(card.endDate) > new Date()
         )
         const cardsWithoutDate = sortCards.filter(
            (card) => card.endDate === null
         )
         const archivalCards = sortCards.filter(
            (card) => Date.parse(card.endDate) < new Date()
         )

         sortByTime(activeCards)
         sortByTime(cardsWithoutDate)
         sortByTime(archivalCards)

         sortCards = activeCards.concat(cardsWithoutDate, archivalCards)
         store.dispatch(getCardsFilter(sortCards))
         break
      }
      default:
         break
   }
}
