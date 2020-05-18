import { GET_PAYER_SUMMARY } from '../types'

const initialState = {
   summary: {},
}

export default function travelReducer(state = initialState, action) {
   switch (action.type) {
      case GET_PAYER_SUMMARY: {
         return {
            ...state,
            summary: action.payload,
         }
      }
      default:
         return state
   }
}
