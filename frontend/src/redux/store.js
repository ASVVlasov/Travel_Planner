import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';

export const history = createHashHistory({
  hashType: 'slash',
});

export default function initStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
  );

  return store;
};
