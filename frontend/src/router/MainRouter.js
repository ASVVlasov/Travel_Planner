import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import TravelPage from '../pages/TravelPage/TravelPage.jsx'

export default class MainRouter extends React.Component {
   render() {
      return (
         <Switch>
            <Route
               path="/cabinet/:userId"
               render={() => <h1>User page will be here soon!</h1>}
            />
            <Route path="/travel/:travelId" component={TravelPage} />
            {/* // FIX Temporary redirect  */}
            <Redirect from="/" to="/travel/1/transport" />{' '}
         </Switch>
      )
   }
}
