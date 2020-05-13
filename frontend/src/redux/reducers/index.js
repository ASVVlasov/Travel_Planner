import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import cardsReducer from './cards.reducer'

const createRootReducer = (history) =>
   combineReducers({
      router: connectRouter(history),
      cardsReducer,
   })

export default createRootReducer
