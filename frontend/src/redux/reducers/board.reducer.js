import {
   GET_BOARD_SUCCESS,
   GET_BOARD_ERROR,
   GET_CARDS,
   DELETE_CARD_SUCCESS,
   DELETE_CARD_ERROR,
} from '../actions/types'

const initialState = {
   travelId: '', // TODO delete after real ID appear in route
   board: [],
   tabs: [],
   cards: [],
   isLoading: true,
   failureLoading: false,
   errorMessage: '',
}

export default function boardReducer(state = initialState, action) {
   switch (action.type) {
      case GET_BOARD_SUCCESS: {
         const { _id, tabs } = action.payload

         const board = tabs.map((tab) => {
            if (!tab._id) {
               tab._id = 'all'
            }
            return { ...tab }
         })

         const tabsList = JSON.parse(JSON.stringify(board))
         tabsList.map((tab) => {
            delete tab.cards
            return { ...tab }
         })

         return {
            ...state,
            travelId: _id, // TODO delete after real ID appear in route
            board: board,
            tabs: tabsList,
            isLoading: false,
            failureLoading: false,
            errorMessage: '',
         }
      }

      case GET_CARDS: {
         const { activeTabId } = action.payload

         const cardsList = []
         state.board.forEach((tab) => {
            const { _id, cards } = tab

            if (activeTabId === _id && cards.length > 0) {
               cardsList.push(...cards)
            }
         })

         return { ...state, cards: cardsList }
      }

      case DELETE_CARD_SUCCESS: {
         const { cardId } = action.payload

         const cardIndex = state.cards.findIndex((card) => card._id === cardId)
         state.cards.splice(cardIndex, 1)

         return { ...state }
      }

      case GET_BOARD_ERROR:
      case DELETE_CARD_ERROR: {
         return {
            ...state,
            tabs: [],
            cards: [],
            isLoading: false,
            failureLoading: true,
            errorMessage: action.payload.err,
         }
      }

      default:
         return state
   }
}
