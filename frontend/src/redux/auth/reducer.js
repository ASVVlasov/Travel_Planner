import {
   EMAIL_CONFIRMATION_SUCCESS,
   GET_INVITED_EMAIL_SUCCESS,
   LOGIN_SUCCESS,
} from '../types'

const initialState = {
   invitedEmail: '',
   confirmedEmail: '',
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
      default:
         return state
   }
}
