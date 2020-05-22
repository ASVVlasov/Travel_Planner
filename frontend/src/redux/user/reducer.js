import { GET_USER_SUCCESS } from '../types'

const initialState = {}

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case GET_USER_SUCCESS: {
         return { ...action.payload }
      }
      default:
         return state
   }
}
