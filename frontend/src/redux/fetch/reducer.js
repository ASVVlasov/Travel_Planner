import {
   GET_INVITED_EMAIL_LOADING,
   GET_INVITED_EMAIL_SUCCESS,
   GET_INVITED_EMAIL_ERROR,
   EMAIL_CONFIRMATION_LOADING,
   EMAIL_CONFIRMATION_SUCCESS,
   EMAIL_CONFIRMATION_ERROR,
   REGISTRATION_LOADING,
   REGISTRATION_SUCCESS,
   REGISTRATION_ERROR,
   LOGIN_LOADING,
   LOGIN_SUCCESS,
   LOGIN_ERROR,
   PASSWORD_CHANGE_REQUEST_LOADING,
   PASSWORD_CHANGE_REQUEST_SUCCESS,
   PASSWORD_CHANGE_REQUEST_ERROR,
   PASSWORD_CHANGE_LOADING,
   PASSWORD_CHANGE_SUCCESS,
   PASSWORD_CHANGE_ERROR,
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
   INVITE_CONTACT_LOADING,
   INVITE_CONTACT_SUCCESS,
   INVITE_CONTACT_ERROR,
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
   GET_BUDGET_LOADING,
   GET_BUDGET_SUCCESS,
   GET_BUDGET_ERROR,
   GET_TRAVEL_LOADING,
   GET_TRAVEL_SUCCESS,
   GET_TRAVEL_ERROR,
   CHANGE_TRAVEL_LOADING,
   CHANGE_TRAVEL_SUCCESS,
   CHANGE_TRAVEL_ERROR,
   CREATE_TRAVEL_LOADING,
   CREATE_TRAVEL_SUCCESS,
   CREATE_TRAVEL_ERROR,
   DELETE_TRAVEL_LOADING,
   DELETE_TRAVEL_SUCCESS,
   DELETE_TRAVEL_ERROR,
   FETCH_ERROR_CLEAR,
   FEEDBACK_LOADING,
   FEEDBACK_SUCCESS,
   FEEDBACK_ERROR,
} from '../types'

export default function fetchReducer(state = {}, action) {
   switch (action.type) {
      case GET_INVITED_EMAIL_LOADING:
      case GET_INVITED_EMAIL_SUCCESS: {
         return {
            ...state,
            invitationError: undefined,
         }
      }
      case GET_INVITED_EMAIL_ERROR: {
         return {
            ...state,
            invitationError: action.payload,
         }
      }

      case EMAIL_CONFIRMATION_LOADING: {
         return {
            ...state,
            emailConfirmationAlert: undefined,
         }
      }
      case EMAIL_CONFIRMATION_SUCCESS: {
         return {
            ...state,
            emailConfirmationAlert: action.alert,
         }
      }
      case EMAIL_CONFIRMATION_ERROR: {
         return {
            ...state,
            emailConfirmationAlert: action.payload,
         }
      }

      case REGISTRATION_LOADING: {
         return {
            ...state,
            registerAlert: undefined,
         }
      }
      case REGISTRATION_SUCCESS: {
         return {
            ...state,
            registerAlert: action.alert,
         }
      }
      case REGISTRATION_ERROR: {
         return {
            ...state,
            registerAlert: action.payload,
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

      case PASSWORD_CHANGE_REQUEST_LOADING: {
         return {
            ...state,
            passwordChangeRequestAlert: undefined,
         }
      }
      case PASSWORD_CHANGE_REQUEST_SUCCESS: {
         return {
            ...state,
            passwordChangeRequestAlert: action.alert,
         }
      }
      case PASSWORD_CHANGE_REQUEST_ERROR: {
         return {
            ...state,
            passwordChangeRequestAlert: action.payload,
         }
      }

      case PASSWORD_CHANGE_LOADING: {
         return {
            ...state,
            passwordChangeAlert: undefined,
         }
      }
      case PASSWORD_CHANGE_SUCCESS: {
         return {
            ...state,
            passwordChangeAlert: action.alert,
         }
      }
      case PASSWORD_CHANGE_ERROR: {
         return {
            ...state,
            passwordChangeAlert: action.payload,
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

      case INVITE_CONTACT_LOADING: {
         return {
            ...state,
            contactSearchError: undefined,
            contactInviteAlert: undefined,
         }
      }
      case INVITE_CONTACT_SUCCESS: {
         return {
            ...state,
            contactInviteAlert: action.alert,
         }
      }

      case INVITE_CONTACT_ERROR: {
         return {
            ...state,
            contactInviteAlert: action.payload,
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

      case GET_BUDGET_LOADING:
      case GET_BUDGET_SUCCESS: {
         return {
            ...state,
            budgetError: undefined,
         }
      }
      case GET_BUDGET_ERROR: {
         return {
            ...state,
            budgetError: action.payload,
         }
      }

      case GET_TRAVEL_LOADING:
      case GET_TRAVEL_SUCCESS:
      case CHANGE_TRAVEL_LOADING:
      case CREATE_TRAVEL_LOADING:
      case CREATE_TRAVEL_SUCCESS:
      case DELETE_TRAVEL_LOADING:
      case DELETE_TRAVEL_SUCCESS: {
         return {
            ...state,
            travelError: undefined,
         }
      }
      case GET_TRAVEL_ERROR:
      case CREATE_TRAVEL_ERROR:
      case DELETE_TRAVEL_ERROR: {
         return {
            ...state,
            travelError: action.payload,
         }
      }

      case CHANGE_TRAVEL_ERROR: {
         return {
            ...state,
            travelError: action.payload,
         }
      }
      case CHANGE_TRAVEL_SUCCESS: {
         return {
            ...state,
            travelError: action.alert,
         }
      }

      case FEEDBACK_LOADING: {
         return {
            ...state,
            feedbackAlert: undefined,
         }
      }
      case FEEDBACK_SUCCESS: {
         return {
            ...state,
            feedbackAlert: action.alert,
         }
      }
      case FEEDBACK_ERROR: {
         return {
            ...state,
            feedbackAlert: action.payload,
         }
      }

      case FETCH_ERROR_CLEAR: {
         return {
            ...state,
            ...action.payload,
         }
      }

      default:
         return state
   }
}
