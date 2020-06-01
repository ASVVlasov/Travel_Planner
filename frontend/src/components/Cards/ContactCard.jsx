import React, { Component } from 'react'
import styles from './ContactCard.module.scss'
import PropTypes from 'prop-types'

export default class ContactCard extends Component {
   static propTypes = {
      contact: PropTypes.object.isRequired,
      deleteContact: PropTypes.func.isRequired,
   }

   //TODO remove
   FILE_URL = window.location.port
      ? 'http://localhost:3300/card/file/'
      : window.location.origin + '/card/file/'

   render() {
      const { _id, avatar, nickName, surname, name, email } = this.props.contact

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
               {avatar && <img src={this.FILE_URL + avatar} alt="" />}
            </div>
         </div>
      )
   }
}
