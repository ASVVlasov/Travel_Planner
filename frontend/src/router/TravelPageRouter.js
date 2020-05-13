import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Board from '../components/Board/Board'

export default class TravelPageRouter extends React.Component {
   render() {
      const { url, path } = this.props.match
      return (
         <Switch>
            <Route
               path={`${path}/board/:board`}
               render={(obj) => <Board category={obj.match.params.board} />}
            />
            <Route>
               <Redirect to={`${url}/board/transport`} />{' '}
               {/* Default board is transport */}
            </Route>
         </Switch>
      )
   }
}
