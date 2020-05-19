import {
   GET_PAYER_SUMMARY,
   GET_HEADER_LOADING,
   GET_HEADER_SUCCESS,
   CHANGE_TRAVEL_DATE_SUCCESS,
   CHANGE_TRAVEL_TITLE_SUCCESS,
   FETCH_ERROR,
} from '../types'

const initialState = {
   summary: {},
   title: '',
   beginDate: null,
   endDate: null,
   errorMessage: '',
   users: [],
   cards: [],
}

export default function travelReducer(state = initialState, action) {
   switch (action.type) {
      case GET_PAYER_SUMMARY: {
         return {
            ...state,
            summary: action.payload,
         }
      }
      case GET_HEADER_LOADING: {
         return {
            ...state,
         }
      }

      case GET_HEADER_SUCCESS: {
         return {
            ...state,
            travelId: action.payload._id,
            title: action.payload.title,
            beginDate: action.payload.beginDate,
            endDate: action.payload.endDate,
            users: action.payload.users,
            cards: action.payload.cards,
         }
      }

      case CHANGE_TRAVEL_DATE_SUCCESS: {
         return {
            ...state,
            beginDate: action.payload.beginDate,
            endDate: action.payload.endDate,
         }
      }

      case CHANGE_TRAVEL_TITLE_SUCCESS: {
         return {
            ...state,
            title: action.payload.title,
         }
      }
      case FETCH_ERROR: {
         return {
            ...state,
            errorMessage: action.payload,
         }
      }
      default:
         return state
   }
}
