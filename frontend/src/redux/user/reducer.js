import {
   GET_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   CREATE_TRAVEL_SUCCESS,
   DELETE_TRAVEL_SUCCESS,
   SEARCH_CONTACT_SUCCESS,
   UPDATE_CONTACTS_SUCCESS,
   CLEAR_CONTACTS_SEARCH,
   FETCH_ERROR,
   AUTHORIZATION_SUCCESS,
} from '../types'

const initialState = { user: {}, newContacts: [], reqError: '' }

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case GET_USER_SUCCESS: {
         return { ...state, user: action.payload }
      }
      case UPDATE_USER_SUCCESS: {
         return {
            ...state,
            user: {
               ...action.payload,
               travels: state.user.travels,
               contacts: state.user.contacts,
            },
         }
      }
      case CREATE_TRAVEL_SUCCESS: {
         return {
            ...state,
            user: {
               ...state.user,
               travels: [...state.user.travels, action.payload],
            },
         }
      }
      case DELETE_TRAVEL_SUCCESS: {
         const index = state.user.travels.findIndex(
            (t) => t._id === action.payload._id
         )
         return {
            ...state,
            user: {
               ...state.user,
               travels: [
                  ...state.user.travels.slice(0, index),
                  ...state.user.travels.slice(index + 1),
               ],
            },
         }
      }
      case SEARCH_CONTACT_SUCCESS: {
         return {
            ...state,
            newContacts: [...state.newContacts, action.payload],
            reqError: '',
         }
      }
      case UPDATE_CONTACTS_SUCCESS: {
         return {
            ...state,
            user: { ...state.user, contacts: action.payload },
         }
      }
      case CLEAR_CONTACTS_SEARCH: {
         return {
            ...state,
            newContacts: [],
            reqError: '',
         }
      }
      case FETCH_ERROR: {
         return {
            ...state,
            reqError: action.payload.message,
         }
      }
      case AUTHORIZATION_SUCCESS: {
         return {
            ...state,
            reqError: '',
         }
      }
      default:
         return state
   }
}
