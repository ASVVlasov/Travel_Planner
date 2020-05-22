import {
   GET_BOARD_SUCCESS,
   GET_TAB_CARDS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   FETCH_LOADING,
   FETCH_ERROR,
   GET_BOARD_FILTER,
} from '../types'

const initialState = {
   tabs: [],
   cards: [],
   currentCards: [],
   isFiltered: false,
   isLoading: false,
   failureLoading: false,
   errorMessage: '',
}

export default function boardReducer(state = initialState, action) {
   switch (action.type) {
      case GET_BOARD_SUCCESS: {
         return {
            ...state,
            tabs: action.payload.tabs,
            cards: action.payload.cards,
            isLoading: false,
         }
      }

      case ADD_CARD_SUCCESS: {
         return {
            ...state,
            cards: [...state.cards, action.payload],
            isLoading: false,
         }
      }

      case CHANGE_CARD_SUCCESS: {
         const index = state.cards.findIndex(
            (card) => card._id === action.payload._id
         )
         return {
            ...state,
            isLoading: false,
            cards: [
               ...state.cards.slice(0, index),
               action.payload,
               ...state.cards.slice(index + 1),
            ],
         }
      }

      case DELETE_CARD_SUCCESS: {
         const index = state.cards.findIndex(
            (card) => card._id === action.payload
         )
         return {
            ...state,
            isLoading: false,
            cards: [
               ...state.cards.slice(0, index),
               ...state.cards.slice(index + 1),
            ],
         }
      }

      case GET_TAB_CARDS: {
         const tabCards = state.cards.filter(
            (card) =>
               card.category &&
               card.category.title ===
                  state.tabs.find((tab) => tab._id === action.payload).title
         )
         return {
            ...state,
            isFiltered: false,
            currentCards: action.payload === 'all' ? state.cards : tabCards,
         }
      }

      case GET_BOARD_FILTER: {
         return {
            ...state,
            isFiltered: true,
            currentCards: state.cards.filter(
               (card) =>
                  !!card.payers.find(
                     (payer) => payer.user._id === action.payload
                  )
            ),
         }
      }

      case FETCH_LOADING: {
         return {
            ...state,
            isLoading: true,
            failureLoading: false,
            errorMessage: '',
         }
      }
      case FETCH_ERROR: {
         return {
            ...state,
            isLoading: false,
            failureLoading: true,
            errorMessage: action.payload,
         }
      }

      default:
         return state
   }
}
