import {
   GET_PAYER_BUDGET,
   GET_TRAVEL_SUCCESS,
   CHANGE_TRAVEL_SUCCESS,
} from '../types'

const initialState = {
   budget: {},
   travel: {},
}

export default function travelReducer(state = initialState, action) {
   switch (action.type) {
      case GET_PAYER_BUDGET: {
         return {
            ...state,
            budget: action.payload,
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
