import {
   REGISTRATION_LOADING,
   REGISTRATION_SUCCESS,
   REGISTRATION_ERROR,
   LOGIN_LOADING,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
} from '../types'

export default function fetchReducer(state = {}, action) {
   switch (action.type) {
      case REGISTRATION_LOADING:
      case REGISTRATION_SUCCESS: {
         return {
            ...state,
            registerError: undefined,
         }
      }
      case REGISTRATION_ERROR: {
         return {
            ...state,
            registerError: action.payload,
         }
      }

      case LOGIN_LOADING:
      case LOGIN_SUCCESS: {
         return {
            ...state,
            loginError: undefined,
         }
      }
      case LOGIN_ERROR: {
         return {
            ...state,
            loginError: action.payload,
         }
      }

      default:
         return state
   }
}
