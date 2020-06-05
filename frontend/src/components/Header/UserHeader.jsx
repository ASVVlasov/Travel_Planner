import React from 'react'
import PropTypes from 'prop-types'
import styles from './UserHeader.module.scss'

import { ReactComponent as LogoutIcon } from '../../assets/images/icons/exit.svg'
import UserForm from '../Forms/UserForm'

export default class UserHeader extends React.Component {
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

   render() {
      const { avatar, nickName, name, email, surname } = this.props.user

      return (
         <header className={styles.header}>
            <span className={styles.user__name} children={name || nickName} />
            <div className={styles.user__avatar} onClick={this.openModal}>
               {!avatar && (name[0] || nickName[0])}
               {avatar && <img src={this.FILE_URL + avatar} alt="" />}
            </div>

            <LogoutIcon
               className={styles.icons}
               onClick={() => this.props.logout()}
            />

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
