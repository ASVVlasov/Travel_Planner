import {
   GET_BOARD_LOADING,
   GET_BOARD_SUCCESS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   GET_BOARD_FILTER,
   SET_USER_FILTER,
   SET_TAB_FILTER,
   SET_HISTORY_FILTER,
   GET_CARDS_FILTER,
   CARD_FILE_LOADING,
} from '../types'

const initialState = {
   tabs: [],
   cards: [],
   currentCards: [],
   tabFilter: 'all',
   userFilter: '',
   historyFilter: false,
   isBoardLoading: false,
   isFileLoading: false,
}

export default function boardReducer(state = initialState, action) {
   switch (action.type) {
      case GET_BOARD_LOADING: {
         return {
            ...state,
            isBoardLoading: true,
         }
      }

      case GET_BOARD_SUCCESS: {
         return {
            ...state,
            tabs: action.payload.tabs,
            cards: action.payload.cards,
            isBoardLoading: false,
         }
      }

      case ADD_CARD_SUCCESS: {
         return {
            ...state,
            cards: [...state.cards, action.payload],
         }
      }

      case CARD_FILE_LOADING: {
         return { ...state, isFileLoading: true }
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
            isFileLoading: false,
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

      case SET_USER_FILTER: {
         return {
            ...state,
            userFilter: action.payload,
         }
      }

      case SET_TAB_FILTER: {
         return {
            ...state,
            tabFilter: action.payload,
         }
      }

      case SET_HISTORY_FILTER: {
         return {
            ...state,
            historyFilter: action.payload,
         }
      }

      case GET_BOARD_FILTER: {
         return {
            ...state,
            currentCards: state.cards.filter(
               (card) =>
                  (state.tabFilter === 'all' ||
                     (card.category &&
                        card.category.title ===
                           state.tabs.find((tab) => tab._id === state.tabFilter)
                              .title)) &&
                  (!state.userFilter ||
                     !!card.payers.find(
                        (payer) => payer.user._id === state.userFilter
                     ))
            ),
         }
      }

      case GET_CARDS_FILTER: {
         return {
            ...state,
            currentCards: action.payload,
         }
      }

      default:
         return state
   }
}
