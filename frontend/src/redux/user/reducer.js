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
         const sortByTime = (array) => {
            array.sort(
               (prev, next) =>
                  Date.parse(prev.beginDate) - Date.parse(next.beginDate)
            )

            let today = new Date()
            let unsorted = array.length - 1
            for (let i = 0; i < unsorted; i++) {
               while (Date.parse(array[i].endDate) < today) {
                  array.push(array[i])
                  array.splice(i, 1)
                  unsorted--
               }
            }
            return array
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
