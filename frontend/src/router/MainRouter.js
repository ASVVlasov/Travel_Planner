import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import UserPage from '../pages/UserPage/UserPage'
import TravelPage from '../pages/TravelPage/TravelPage'
import HomePage from '../pages/HomePage/HomePage'

export default class MainRouter extends React.Component {
   render() {
      return (
         <Switch>
            <Route path="/profile/:tab" component={UserPage} />
            <Route path="/travel/:travelId" component={TravelPage} />
            <Route path="/home/" component={HomePage} />
            {/* // FIX Temporary redirect  */}
            <Redirect exact from="/" to="/profile/travels" />
         </Switch>
      )
   }
}
