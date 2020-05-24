import { GET_USER_SUCCESS, CREATE_TRAVEL_SUCCESS } from '../types'

const initialState = {}

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case GET_USER_SUCCESS: {
         return { ...action.payload }
      }
      case CREATE_TRAVEL_SUCCESS: {
         return {
            ...state,
            travels: [...state.travels, action.payload],
         }
      }
      default:
         return state
   }
}
