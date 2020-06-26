import { GET_INVITED_EMAIL_SUCCESS, REGISTRATION_SUCCESS } from '../types'

const initialState = {
   invitedEmail: '',
}

export default function authReducer(state = initialState, action) {
   switch (action.type) {
      case GET_INVITED_EMAIL_SUCCESS: {
         return { ...state, invitedEmail: action.payload.email }
      }
      case REGISTRATION_SUCCESS: {
         return { ...state, invitedEmail: '' }
      }
      default:
         return state
   }
}
