import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import boardReducer from './board/reducer'
import travelReducer from './travel/reducer'
import userReducer from './user/reducer'
import fetchReducer from './fetch/reducer'

const createRootReducer = (history) =>
   combineReducers({
      router: connectRouter(history),
      boardReducer,
      travelReducer,
      userReducer,
      fetchReducer,
   })

export default createRootReducer
