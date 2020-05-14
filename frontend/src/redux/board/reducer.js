import {
   GET_BOARD_SUCCESS,
   GET_BOARD_ERROR,
   GET_CARDS,
   DELETE_CARD_SUCCESS,
   DELETE_CARD_ERROR,
   CHANGE_CARD_SUCCESS,
   CHANGE_CARD_ERROR,
} from '../types'

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
         const cards = state.cards.filter((card) => card._id !== cardId)
         return { ...state, cards }
      }

      case CHANGE_CARD_SUCCESS: {
         const { updCard } = action.payload

         const cards = state.cards.map((card) => {
            if (card._id === updCard._id) {
               return updCard
            }
            return card
         })

         return { ...state, cards }
      }

      case GET_BOARD_ERROR:
      case CHANGE_CARD_ERROR:
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
