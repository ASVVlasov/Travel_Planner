import React from 'react'
import PropTypes from 'prop-types'
import styles from './UserHeader.module.scss'

import { ReactComponent as LogoutIcon } from '../../assets/images/icons/exit.svg'

export default class UserHeader extends React.Component {
   static propTypes = {
      user: PropTypes.object.isRequired,
   }
   //TODO remove
   FILE_URL = window.location.port
      ? 'http://localhost:3300/card/file/'
      : window.location.origin + '/card/file/'

   render() {
      const { avatar, nickName, name } = this.props.user
      return (
         <header className={styles.header}>
            <span className={styles.user__name} children={name || nickName} />
            <div className={styles.user__avatar}>
               {!avatar && (name[0] || nickName[0])}
               {avatar && <img src={this.FILE_URL + avatar} alt="" />}
            </div>

            <LogoutIcon className={styles.icons} />
         </header>
      )
   }
}
