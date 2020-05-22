import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import boardReducer from './board/reducer'
import travelReducer from './travel/reducer'
import userReducer from './user/reducer'

const createRootReducer = (history) =>
   combineReducers({
      router: connectRouter(history),
      boardReducer,
      travelReducer,
      userReducer,
   })

export default createRootReducer
