import {
   GET_USER_SUCCESS,
   UPDATE_USER_SUCCESS,
   CREATE_TRAVEL_SUCCESS,
   GET_TRAVELS_FILTER,
} from '../types'

const initialState = {}

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
      case GET_TRAVELS_FILTER: {
         function sortByTime(travels) {
            travels.sort(
               (prev, next) =>
                  Date.parse(prev.beginDate) - Date.parse(next.beginDate)
            )

            let upperBound = travels.length
            for (let i = 0; i < upperBound; i++) {
               if (Date.parse(travels[i].endDate) < new Date()) {
                  travels.push(travels[i])
                  travels.splice(i, 1)
                  upperBound--
                  i--
               }
            }
            return travels
         }

         return {
            ...state,
            travels: sortByTime(state.travels),
         }
      }
      default:
         return state
   }
}
