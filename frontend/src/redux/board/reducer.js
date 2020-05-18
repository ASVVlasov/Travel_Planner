import {
   GET_BOARD_SUCCESS,
   GET_CARDS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   FETCH_ERROR,
   GET_BOARD_FILTER,
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
            tabs: action.payload,
            isLoading: false,
         }
      }

      case GET_CARDS: {
         const index = state.tabs.findIndex((tab) => tab._id === action.payload)
         return { ...state, cards: state.tabs[index].cards }
      }

      case ADD_CARD_SUCCESS: {
         return {
            ...state,
            cards: [...state.cards, action.payload],
         }
      }

      case CHANGE_CARD_SUCCESS: {
         const index = state.cards.findIndex(
            (card) => card._id === action.payload._id
         )
         return {
            ...state,
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
            errorMessage: action.payload,
         }
      }

      case GET_BOARD_FILTER: {
         return {
            ...state,
            cards: state.cards.filter(
               (card) =>
                  !!card.payers.find(
                     (payer) => payer.user._id === action.payload
                  )
            ),
         }
      }

      default:
         return state
   }
}
