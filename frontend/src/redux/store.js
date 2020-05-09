import { createStore, applyMiddleware, compose } from 'redux'
import { createHashHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import createRootReducer from './reducers'

const persistConfig = {
   key: 'TravelPlanner',
   storage,
   stateReconciler: autoMergeLevel2
}

export const history = createHashHistory({
   hashType: 'slash',
})

const pReducer = persistReducer(persistConfig, createRootReducer(history))

export default function initStore(preloadedState) {
   const store = createStore(
      pReducer,
      preloadedState,
      compose(
         applyMiddleware(
            routerMiddleware(history),
            thunk
         ),
         window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
      )
   )

   const persistor = persistStore(store)

   return { store, persistor }
}
