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
   GET_BOARD_LOADING,
   GET_BOARD_SUCCESS,
   GET_BOARD_ERROR,
   ADD_CARD_LOADING,
   ADD_CARD_SUCCESS,
   ADD_CARD_ERROR,
   CHANGE_CARD_LOADING,
   CHANGE_CARD_SUCCESS,
   CHANGE_CARD_ERROR,
   DELETE_CARD_SUCCESS,
   DELETE_CARD_ERROR,
   CARD_FILE_LOADING,
   CARD_FILE_ERROR,
   ADD_PAYER_LOADING,
   ADD_PAYER_ERROR,
   DELETE_PAYER_LOADING,
   DELETE_PAYER_ERROR,
   SET_PAYER_LOADING,
   SET_PAYER_ERROR,
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

      case GET_BOARD_LOADING:
      case GET_BOARD_SUCCESS: {
         return {
            ...state,
            boardError: undefined,
         }
      }
      case GET_BOARD_ERROR: {
         return {
            ...state,
            boardError: action.payload,
         }
      }

      case ADD_CARD_LOADING:
      case ADD_CARD_SUCCESS:
      case CHANGE_CARD_LOADING:
      case CHANGE_CARD_SUCCESS:
      case DELETE_CARD_SUCCESS:
      case CARD_FILE_LOADING:
      case ADD_PAYER_LOADING:
      case DELETE_PAYER_LOADING:
      case SET_PAYER_LOADING: {
         return {
            ...state,
            cardError: undefined,
         }
      }
      case ADD_CARD_ERROR:
      case CHANGE_CARD_ERROR:
      case DELETE_CARD_ERROR:
      case CARD_FILE_ERROR:
      case ADD_PAYER_ERROR:
      case DELETE_PAYER_ERROR:
      case SET_PAYER_ERROR: {
         return {
            ...state,
            cardError: action.payload,
         }
      }

      default:
         return state
   }
}
