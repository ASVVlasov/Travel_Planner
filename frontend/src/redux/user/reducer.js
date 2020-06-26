import {
   GET_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   CREATE_TRAVEL_SUCCESS,
   GET_TRAVELS_FILTER,
   DELETE_TRAVEL_SUCCESS,
   SEARCH_CONTACT_SUCCESS,
   UPDATE_CONTACTS_SUCCESS,
   CLEAR_CONTACTS_SEARCH,
   LOGIN_SUCCESS,
   LOGOUT_SUCCESS,
   LOGOUT_ERROR,
   UNAUTHORIZED,
   USER_AVATAR_LOADING,
   USER_AVATAR_ERROR,
   GET_INVITED_EMAIL_SUCCESS,
   REGISTRATION_SUCCESS,
} from '../types'

const initialState = {
   auth: false,
   userIsLoading: true,
   avatarIsLoading: false,
   user: {},
   newContacts: [],
   invitedUser: '',
}

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case GET_USER_SUCCESS: {
         return { ...state, user: action.payload, userIsLoading: false }
      }
      case UPDATE_USER_SUCCESS: {
         return {
            ...state,
            user: {
               ...action.payload,
               travels: state.user.travels,
               contacts: state.user.contacts,
            },
            avatarIsLoading: false,
         }
      }
      case USER_AVATAR_LOADING: {
         return {
            ...state,
            avatarIsLoading: true,
         }
      }
      case USER_AVATAR_ERROR: {
         return {
            ...state,
            avatarIsLoading: false,
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
         const duplicate = state.newContacts.find(
            (nc) => nc._id === action.payload._id
         )
         return {
            ...state,
            newContacts: !duplicate
               ? [...state.newContacts, action.payload]
               : state.newContacts,
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
         }
      }

      case LOGIN_SUCCESS:
      case LOGOUT_SUCCESS:
      case LOGOUT_ERROR:
      case UNAUTHORIZED: {
         return {
            ...state,
            ...action.payload,
         }
      }
      case GET_TRAVELS_FILTER: {
         return {
            ...state,
            user: {
               ...state.user,
               travels: action.payload,
            },
         }
      }
      case GET_INVITED_EMAIL_SUCCESS: {
         return { ...state, invitedUser: action.payload }
      }
      case REGISTRATION_SUCCESS: {
         return { ...state, invitedUser: '' }
      }
      default:
         return state
   }
}
