import {
   GET_BOARD_SUCCESS,
   ADD_CARD_SUCCESS,
   CHANGE_CARD_SUCCESS,
   DELETE_CARD_SUCCESS,
   FETCH_LOADING,
   FETCH_ERROR,
   GET_BOARD_FILTER,
   SET_USER_FILTER,
   SET_TAB_FILTER,
   SET_HISTORY_FILTER,
} from '../types'

import { sortByCategories, sortByTime } from '../common/middlewares'

const initialState = {
   tabs: [],
   cards: [],
   currentCards: [],
   tabFilter: 'all',
   userFilter: '',
   historyFilter: false,
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
            currentCards: sortByTime(sortByCategories(state, state.cards)),
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
