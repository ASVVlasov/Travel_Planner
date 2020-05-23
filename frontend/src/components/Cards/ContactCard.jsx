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
      surname: 'Фамилия',
      name: 'Имя',
      email: 'test@mail.tu',
   }

   //TODO remove
   FILE_URL = window.location.port
      ? 'http://localhost:3300/card/file/'
      : window.location.origin + '/card/file/'

   render() {
      const { avatar, nickName } = this.props.contact
      const { surname, name, email } = this.state

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

            {fullName && (
               <span className={styles.contact__nickName} children={nickName} />
            )}

            <a
               className={styles.contact__email}
               href={`mailto:${email}`}
               children={email}
            />

            <div className={styles.contact__avatar}>
               {!avatar && nickName[0]}
               {avatar && <img src={this.FILE_URL + avatar} alt="" />}
            </div>
         </div>
      )
   }
}
