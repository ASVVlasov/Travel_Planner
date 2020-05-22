import React from 'react'
import { Route } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { getUserInfo } from '../../redux/user/operations'

import styles from './UserPage.module.scss'
import UserHeader from '../../components/Header/UserHeader'
import UserBoard from '../../components/Board/UserBoard'
import UserFooter from '../../components/Footer/UserFooter'

class UserPage extends React.Component {
   componentDidMount() {
      this.props.getUserInfo()
   }
   render() {
      return (
         <div className={styles.userPage}>
            <UserHeader />
            <Route path={this.props.match.path} component={UserBoard} />
            <UserFooter />
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getUserInfo }, dispatch)

export default connect(null, mapDispatchToProps)(UserPage)
