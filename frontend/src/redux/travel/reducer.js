import {
   GET_BUDGET_SUCCESS,
   GET_TRAVEL_SUCCESS,
   CHANGE_TRAVEL_SUCCESS,
} from '../types'

const initialState = {
   budget: {},
   travel: {},
   travelIsLoading: true,
}

export default function travelReducer(state = initialState, action) {
   switch (action.type) {
      case GET_BUDGET_SUCCESS: {
         return {
            ...state,
            budget: action.payload,
         }
      }

      case GET_TRAVEL_SUCCESS: {
         return {
            ...state,
            travel: action.payload,
            travelIsLoading: false,
         }
      }

      case CHANGE_TRAVEL_SUCCESS: {
         return {
            ...state,
            travel: action.payload.data,
         }
      }

      default:
         return state
   }
}
