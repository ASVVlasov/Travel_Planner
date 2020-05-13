import { CARDS_SUCCESS, CARDS_ERROR } from '../actions/types'

const initialStore = {
   tabs: [],
   isLoading: true,
   failureLoading: false,
   errorMessage: '',
}

export default function cardsReducer(store = initialStore, action) {
   switch (action.type) {
      case CARDS_SUCCESS: {
         const { tabs } = action.payload
         return { ...store, tabs, isLoading: false }
      }
      case CARDS_ERROR: {
         return {
            ...store,
            failureLoading: true,
            errorMessage: action.payload.err,
         }
      }
      default:
         return store
   }
}
