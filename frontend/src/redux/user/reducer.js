import {
   GET_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   CREATE_TRAVEL_SUCCESS,
   GET_TRAVELS_FILTER,
} from '../types'

import { sortByTime } from '../common/middlewares'

const initialState = {}

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case GET_USER_SUCCESS: {
         return { ...action.payload }
      }
      case UPDATE_USER_SUCCESS: {
         return {
            ...action.payload,
            travels: state.travels,
            contacts: state.contacts,
         }
      }
      case CREATE_TRAVEL_SUCCESS: {
         return {
            ...state,
            travels: [...state.travels, action.payload],
         }
      }
      case GET_TRAVELS_FILTER: {
         return {
            ...state,
            travels: sortByTime(state.travels),
         }
      }
      default:
         return state
   }
}
