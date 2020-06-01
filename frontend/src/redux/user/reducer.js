import {
   GET_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   CREATE_TRAVEL_SUCCESS,
   SEARCH_CONTACT_SUCCESS,
   UPDATE_CONTACTS_SUCCESS,
   CLEAR_CONTACTS_SEARCH,
} from '../types'

const initialState = { newContacts: [], reqError: '' }

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
      case SEARCH_CONTACT_SUCCESS: {
         return {
            ...state,
            newContact: action.payload,
         }
      }
      case UPDATE_CONTACTS_SUCCESS: {
         return {
            ...state,
            contacts: action.payload,
         }
      }
      case CLEAR_CONTACTS_SEARCH: {
         return {
            ...state,
            newContacts: [],
            reqError: '',
         }
      }
      default:
         return state
   }
}
