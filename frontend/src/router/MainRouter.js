import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import connect from 'react-redux/es/connect/connect'

import UserPage from '../pages/UserPage/UserPage'
import TravelPage from '../pages/TravelPage/TravelPage'
import HomePage from '../pages/HomePage/HomePage'
import PageNotFound from '../pages/PageNotFound/PageNotFound'

class MainRouter extends React.Component {
   render() {
      if (!this.props.auth) {
         return (
            <Switch>
               <Route path="/home/:tab" component={HomePage} />
               <Redirect to="/home/signin" />
            </Switch>
         )
      }
      return (
         <Switch>
            <Route path="/profile/:tab" component={UserPage} />
            <Route path="/travel/:travelId" component={TravelPage} />
            <Route path="/404" component={PageNotFound} />
            <Redirect to="/profile/travels" />
         </Switch>
      )
   }
}

const mapStateToProps = ({ userReducer }) => ({
   auth: userReducer.auth,
})
export default connect(mapStateToProps)(MainRouter)
