import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import boardReducer from './board.reducer'

const createRootReducer = (history) =>
   combineReducers({
      router: connectRouter(history),
      boardReducer,
   })

export default createRootReducer
