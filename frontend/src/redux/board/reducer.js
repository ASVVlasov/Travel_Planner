import {
   GET_BOARD_SUCCESS,
   GET_CARDS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   FETCH_ERROR,
} from '../types'

const initialState = {
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

         return {
            ...state,
            tabs,
            isLoading: false,
         }
      }

      case GET_CARDS: {
         const { activeTabId } = action.payload

         const index = state.tabs.findIndex((tab) => tab._id === activeTabId)
         const cardsList = state.tabs[index].cards

         return { ...state, cards: cardsList }
      }

      case ADD_CARD_SUCCESS: {
         return {
            ...state,
            cards: [...state.cards, action.payload.newCard],
         }
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

      case DELETE_CARD_SUCCESS: {
         const { cardId } = action.payload
         const cards = state.cards.filter((card) => card._id !== cardId)
         return { ...state, cards }
      }

      case FETCH_ERROR: {
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
