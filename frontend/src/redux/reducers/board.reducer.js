import { GET_BOARD_SUCCESS, GET_BOARD_ERROR, GET_CARDS } from '../actions/types'

const initialState = {
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
         const { tabs } = action.payload

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
            board: board,
            tabs: tabsList,
            isLoading: false,
            failureLoading: false,
            errorMessage: '',
         }
      }

      case GET_BOARD_ERROR: {
         return {
            ...state,
            tabs: [],
            cards: [],
            isLoading: false,
            failureLoading: true,
            errorMessage: action.payload.err,
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

      default:
         return state
   }
}
