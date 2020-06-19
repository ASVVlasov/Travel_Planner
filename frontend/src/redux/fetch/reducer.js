import {
   REGISTRATION_LOADING,
   REGISTRATION_SUCCESS,
   REGISTRATION_ERROR,
   LOGIN_LOADING,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   GET_USER_LOADING,
   GET_USER_SUCCESS,
   GET_USER_ERROR,
   UPDATE_USER_LOADING,
   UPDATE_USER_SUCCESS,
   UPDATE_USER_ERROR,
   USER_AVATAR_LOADING,
   USER_AVATAR_ERROR,
   SEARCH_CONTACT_LOADING,
   SEARCH_CONTACT_SUCCESS,
   SEARCH_CONTACT_ERROR,
   CLEAR_ERROR_SEARCH,
   UPDATE_CONTACTS_SUCCESS,
   UPDATE_CONTACTS_ERROR,
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

      case GET_USER_LOADING:
      case GET_USER_SUCCESS:
      case UPDATE_USER_LOADING:
      case UPDATE_USER_SUCCESS:
      case USER_AVATAR_LOADING:
      case UPDATE_CONTACTS_SUCCESS: {
         return {
            ...state,
            userError: undefined,
         }
      }
      case GET_USER_ERROR:
      case UPDATE_USER_ERROR:
      case USER_AVATAR_ERROR:
      case UPDATE_CONTACTS_ERROR: {
         return {
            ...state,
            userError: action.payload,
         }
      }

      case SEARCH_CONTACT_LOADING:
      case SEARCH_CONTACT_SUCCESS:
      case CLEAR_ERROR_SEARCH: {
         return {
            ...state,
            contactSearchError: undefined,
         }
      }
      case SEARCH_CONTACT_ERROR: {
         return {
            ...state,
            contactSearchError: action.payload,
         }
      }

      default:
         return state
   }
}
