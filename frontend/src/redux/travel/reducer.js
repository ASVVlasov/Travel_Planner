import {
   GET_PAYER_SUMMARY,
   GET_TRAVEL_SUCCESS,
   CHANGE_TRAVEL_SUCCESS,
} from '../types'

const initialState = {
   summary: {},
   travel: {},
}

export default function travelReducer(state = initialState, action) {
   switch (action.type) {
      case GET_PAYER_SUMMARY: {
         return {
            ...state,
            summary: action.payload,
         }
      }

      case GET_TRAVEL_SUCCESS: {
         return {
            ...state,
            travel: action.payload,
         }
      }

      case CHANGE_TRAVEL_SUCCESS: {
         return {
            ...state,
            travel: action.payload,
         }
      }

      default:
         return state
   }
}
