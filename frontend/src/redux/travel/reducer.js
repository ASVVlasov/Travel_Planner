import {
   GET_BUDGET_SUCCESS,
   GET_TRAVEL_LOADING,
   GET_TRAVEL_SUCCESS,
   CHANGE_TRAVEL_SUCCESS,
} from '../types'

const initialState = {
   budget: {},
   travel: {},
   isTravelLoading: false,
}

export default function travelReducer(state = initialState, action) {
   switch (action.type) {
      case GET_BUDGET_SUCCESS: {
         return {
            ...state,
            budget: action.payload,
         }
      }

      case GET_TRAVEL_LOADING: {
         return {
            ...state,
            isTravelLoading: true,
         }
      }
      case GET_TRAVEL_SUCCESS: {
         return {
            ...state,
            travel: action.payload,
            isTravelLoading: false,
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
