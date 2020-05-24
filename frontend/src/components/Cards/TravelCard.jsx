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
   FILE_URL = window.location.port
      ? 'http://localhost:3300/card/file/'
      : window.location.origin + '/card/file/'

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

   avatarsToRender = (users) =>
      users.map((user) => (
         <div className={styles.avatar} title={user.nickName} key={user._id}>
            {!user.avatar && user.nickName[0]}
            {user.avatar && (
               <img src={this.FILE_URL + user.avatar} alt={user.nickName} />
            )}
         </div>
      ))

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
            <div className={styles.card}>
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
