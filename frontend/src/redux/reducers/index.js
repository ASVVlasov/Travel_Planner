import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import boardReducer from './board.reducer'
import { headerReducer } from './header.reducer'

const createRootReducer = (history) =>
   combineReducers({
      router: connectRouter(history),
      boardReducer,
      headerReducer,
   })

export default createRootReducer
