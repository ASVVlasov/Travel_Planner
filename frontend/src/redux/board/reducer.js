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
         return {
            ...state,
            tabs: action.payload.tabs,
            isLoading: false,
         }
      }

      case GET_CARDS: {
         const { activeTabId } = action.payload
         const index = state.tabs.findIndex((tab) => tab._id === activeTabId)
         return { ...state, cards: state.tabs[index].cards }
      }

      case ADD_CARD_SUCCESS: {
         return {
            ...state,
            cards: [...state.cards, action.payload.newCard],
         }
      }

      case CHANGE_CARD_SUCCESS: {
         const { updCard } = action.payload
         const index = state.cards.findIndex((card) => card._id === updCard._id)
         return {
            ...state,
            cards: [
               ...state.cards.slice(0, index),
               updCard,
               ...state.cards.slice(index + 1),
            ],
         }
      }

      case DELETE_CARD_SUCCESS: {
         const { cardId } = action.payload
         const index = state.cards.findIndex((card) => card._id === cardId)
         return {
            ...state,
            cards: [
               ...state.cards.slice(0, index),
               ...state.cards.slice(index + 1),
            ],
         }
      }

      case FETCH_ERROR: {
         return {
            ...state,
            isLoading: false,
            failureLoading: true,
            errorMessage: action.payload.err,
         }
      }

      default:
         return state
   }
}
