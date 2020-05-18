import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import boardReducer from './board/reducer'
import travelReducer from './travel/reducer'

const createRootReducer = (history) =>
   combineReducers({
      router: connectRouter(history),
      boardReducer,
      travelReducer,
   })

export default createRootReducer
