import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { Provider } from 'react-redux';
import initStore, { history } from './redux/store.js';
import { ConnectedRouter } from 'connected-react-router';

import TravelPage from "./pages/TravelPage/TravelPage";

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <TravelPage />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
