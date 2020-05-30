import React, { Component } from 'react'
import styles from './ContactCard.module.scss'
import PropTypes from 'prop-types'

export default class ContactCard extends Component {
   static propTypes = {
      _id: PropTypes.string,
      title: PropTypes.string,
      beginDate: PropTypes.string,
      endDate: PropTypes.string,
      payers: PropTypes.arrayOf(PropTypes.object),
   }

   state = {
      email: 'test@mail.tu', //TODO remove after real data appear
   }

   //TODO remove
   AVATAR_URL = window.location.port
      ? 'http://localhost:3300/user/avatar/'
      : window.location.origin + '/user/avatar/'

   render() {
      const { avatar, nickName, surname, name } = this.props.contact
      const { email } = this.state

      const fullName = name
         ? surname
            ? `${name} ${surname}`
            : name
         : surname
         ? surname
         : null

      return (
         <div className={styles.card}>
            <h2
               className={styles.contact__name}
               children={fullName || nickName}
            />

            <div className={styles.contact__additional}>
               {fullName && (
                  <span
                     className={styles.contact__nickName}
                     children={nickName}
                  />
               )}
               <a
                  className={styles.contact__email}
                  href={`mailto:${email}`}
                  children={email}
               />
            </div>

            <div className={styles.contact__avatar}>
               {!avatar && nickName[0]}
               {avatar && <img src={this.AVATAR_URL + avatar} alt="" />}
            </div>
         </div>
      )
   }
}
