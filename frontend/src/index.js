import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import { Provider } from 'react-redux';
import initStore, { history } from './redux/store.js';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';

import TravelPage from "./pages/TravelPage/TravelPage";

const store = initStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <Switch>
        <Route exact path='/cabinet' render={() => <h1>User page will be here soon!</h1>} />
        <Route path='/travel' component={TravelPage} />
        <Route path="/"> {/* // FIX Temporary route */}
          <Redirect to="/travel" />
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
