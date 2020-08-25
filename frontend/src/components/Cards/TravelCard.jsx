import React, { Component } from 'react'
import styles from './TravelCard.module.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class TravelCard extends Component {
   static propTypes = {
      _id: PropTypes.string,
      title: PropTypes.string,
      beginDate: PropTypes.string,
      endDate: PropTypes.string,
      payers: PropTypes.arrayOf(PropTypes.object),
   }

   //TODO remove
   AVATAR_URL = window.location.port
      ? 'http://localhost:3300/user/avatar/'
      : window.location.origin + '/user/avatar/'

   convertDate = (date = null) => {
      if (date) {
         const stringToDate = new Date(Date.parse(date))
         return stringToDate.toLocaleString('ru', {
            timeZone: 'Europe/Moscow',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
         })
      }
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

   avatarsToRender = (users) =>
      users.map((user) => {
         return (
            <div
               className={styles.avatar}
               title={this.getUserName(user)}
               key={user._id}
            >
               {!user.avatar && this.getUserName(user, true)}
               {user.avatar && (
                  <img
                     src={this.AVATAR_URL + user.avatar}
                     alt={this.getUserName(user)}
                     title={this.getUserName(user)}
                  />
               )}
            </div>
         )
      })

   render() {
      const {
         _id,
         status,
         title,
         beginDate,
         endDate,
         users,
      } = this.props.travel

      return (
         <Link to={`/travel/${_id}/transport`}>
            <div
               className={
                  status === 'АКТИВНАЯ'
                     ? styles.card
                     : `${styles.card} ${styles.card_archiveCard}`
               }
            >
               {status === 'АРХИВНАЯ' && (
                  <span
                     className={styles.card__status}
                     children={status.toLowerCase()}
                  />
               )}
               <h2 className={styles.card__title} children={title} />
               <div className={styles.card__dates}>
                  <span
                     className={styles.date}
                     children={this.convertDate(beginDate)}
                  />
                  &nbsp; &mdash; &nbsp;
                  <span
                     className={styles.date}
                     children={this.convertDate(endDate)}
                  />
               </div>
               <div
                  className={styles.card__travelers}
                  children={this.avatarsToRender(users)}
               />
            </div>
         </Link>
      )
   }
}
