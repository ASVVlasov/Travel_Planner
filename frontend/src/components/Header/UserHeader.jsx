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

   getUserName = (user, isAvatarName = false) => {
      const { nickName, surname, name } = user
      if (isAvatarName) {
         return name
            ? surname
               ? `${name[0]}${surname[0]}`
               : name[0]
            : nickName[0]
      }
      return name || surname ? `${name} ${surname}`.trim() : nickName
   }

   render() {
      const { avatar, nickName, name, email, surname } = this.props.user
      const user = this.props.user

      return (
         <header className={styles.header}>
            <span
               className={styles.user__name}
               children={this.getUserName(user)}
            />
            <div className={styles.user__avatar} onClick={this.openModal}>
               {!avatar && this.getUserName(user, true)}
               {avatar && (
                  <img
                     src={this.FILE_URL + avatar}
                     alt={this.getUserName(user)}
                     title={this.getUserName(user)}
                  />
               )}
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
