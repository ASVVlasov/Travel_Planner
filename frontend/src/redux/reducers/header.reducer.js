import { GET_TRAVEL_DATE, GET_TRAVEL_TITLE } from '../actions/types'

const initialState = {
   travelId: '', // TODO delete after real ID appear in route
   title: '',
   beginDate: '',
   endDate: '',
}

export function headerReducer(state = initialState, action) {
   switch (action.type) {
      case GET_TRAVEL_DATE: {
         return {
            ...state,
            beginDate: action.payload.beginDate,
            endDate: action.payload.endDate,
            travelId: action.payload._id,
         }
      }
      case GET_TRAVEL_TITLE: {
         return {
            ...state,
            title: action.payload.title,
            travelId: action.payload._id,
         }
      }
      default:
         return state
   }
}
