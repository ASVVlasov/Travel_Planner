import {
   EMAIL_CONFIRMATION_SUCCESS,
   GET_INVITED_EMAIL_SUCCESS,
   LOGIN_SUCCESS,
   GET_EMAIL_PASSWORD_CHANGE_SUCCESS,
   PASSWORD_CHANGE_SUCCESS,
} from '../types'

const initialState = {
   invitedEmail: '',
   confirmedEmail: '',
   emailPasswordChange: '',
}

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case GET_INVITED_EMAIL_SUCCESS: {
         return { ...state, invitedEmail: action.payload.email }
      }

      case EMAIL_CONFIRMATION_SUCCESS: {
         return { ...state, confirmedEmail: action.payload.email }
      }

      case LOGIN_SUCCESS: {
         return { ...state, confirmedEmail: '', invitedEmail: '' }
      }
      case GET_EMAIL_PASSWORD_CHANGE_SUCCESS: {
         return { ...state, emailPasswordChange: action.payload.data.email }
      }
      case PASSWORD_CHANGE_SUCCESS: {
         return { ...state, emailPasswordChange: '' }
      }
      default:
         return state
   }
}
