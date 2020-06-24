import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { getUserInfo } from '../../redux/user/operations'

import styles from './UserPage.module.scss'
import UserHeader from '../../components/Header/UserHeader'
import UserBoard from '../../components/Board/UserBoard'
import UserFooter from '../../components/Footer/UserFooter'
import Loader from '../../controls/Loader/Loader'
import Alert from '../../controls/Alert/Alert'

class UserPage extends React.Component {
   static propTypes = {
      getUserInfo: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
      user: PropTypes.object.isRequired,
   }

   isPropsReceived = (object) => Object.keys(object).length

   componentDidMount() {
      this.props.getUserInfo()
   }

   render() {
      const { match, user, isLoading, userError } = this.props
      return (
         <>
            {!isLoading && this.isPropsReceived(user) ? (
               <div className={styles.userPage}>
                  <UserHeader user={user} />
                  <Route path={match.path} component={UserBoard} />
                  <UserFooter />
               </div>
            ) : (
               <Loader type="big" />
            )}
            {userError && <Alert {...userError} errName="userError" />}
         </>
      )
   }
}

const mapStateToProps = ({ userReducer, fetchReducer }) => ({
   isLoading: userReducer.userIsLoading,
   user: userReducer.user,
   userError: fetchReducer.userError,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getUserInfo }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
