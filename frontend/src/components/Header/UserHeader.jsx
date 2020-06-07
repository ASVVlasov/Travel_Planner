import React from 'react'
import PropTypes from 'prop-types'
import styles from './UserHeader.module.scss'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { push } from 'connected-react-router'
import { logout } from '../../redux/auth/operations'

import { ReactComponent as LogoutIcon } from '../../assets/images/icons/exit.svg'
import UserForm from '../Forms/UserForm'

class UserHeader extends React.Component {
   static propTypes = {
      user: PropTypes.object.isRequired,
      logout: PropTypes.func.isRequired,
   }
   //TODO remove
   FILE_URL = window.location.port
      ? 'http://localhost:3300/user/avatar/'
      : window.location.origin + '/user/avatar/'

   state = {
      isModalOpen: false,
   }

   openModal = () => {
      this.setState({ isModalOpen: true })
   }

   closeModal = () => {
      this.setState({ isModalOpen: false })
   }

   logout = async () => {
      await this.props.logout()
      push('/')
   }

   render() {
      const { avatar, nickName, name, email, surname } = this.props.user

      return (
         <header className={styles.header}>
            <span className={styles.user__name} children={name || nickName} />
            <div className={styles.user__avatar} onClick={this.openModal}>
               {!avatar && (name[0] || nickName[0])}
               {avatar && <img src={this.FILE_URL + avatar} alt="" />}
            </div>

            <LogoutIcon className={styles.icons} onClick={this.logout} />

            {this.state.isModalOpen && (
               <UserForm
                  onClose={this.closeModal}
                  user={{ nickName, name, email, surname }}
                  avatar={avatar}
               />
            )}
         </header>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ logout, push }, dispatch)
export default connect(null, mapDispatchToProps)(UserHeader)
