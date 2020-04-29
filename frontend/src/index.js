import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import { Provider } from 'react-redux'
import store from './redux/store.js'
import TravelPage from "./pages/TravelPage/TravelPage";

ReactDOM.render(
  <Provider store={store}>
    <TravelPage />
  </Provider>,
  document.getElementById('root')
)
