import { createStore } from 'redux'

import initReducers from './reducers'

export default createStore(initReducers)