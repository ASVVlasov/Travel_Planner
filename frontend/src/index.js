import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { Provider } from 'react-redux';
import initStore, { history } from './redux/store.js';
import { ConnectedRouter } from 'connected-react-router';

import MainRouter from './router/MainRouter';

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <MainRouter />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
