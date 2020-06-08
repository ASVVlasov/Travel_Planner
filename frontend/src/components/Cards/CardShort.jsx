import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './CardShort.module.scss'

import CardFull from './CardFull'
import { ReactComponent as ConfirmIcon } from '../../assets/images/icons/document.svg'
import { ReactComponent as PaidIcon } from '../../assets/images/icons/receipt.svg'

export default class CardShort extends Component {
   static propTypes = {
      _id: PropTypes.string,
      title: PropTypes.string,
      company: PropTypes.string,
      beginPoint: PropTypes.string,
      beginDate: PropTypes.string,
      endPoint: PropTypes.string,
      endDate: PropTypes.string,
      files: PropTypes.arrayOf(PropTypes.object),
      payers: PropTypes.arrayOf(PropTypes.object),
      comment: PropTypes.string,
      cost: PropTypes.number,
   }

   state = {
      fullInfoOpened: false,
   }

   //TODO remove
   AVATAR_URL = window.location.port
      ? 'http://localhost:3300/user/avatar/'
      : window.location.origin + '/user/avatar/'

   showFullInfo = () => {
      this.setState({ fullInfoOpened: true })
   }

   closeFullInfo = () => {
      this.setState({ fullInfoOpened: false })
   }

   convertDate = (date = null) => {
      if (date) {
         const stringToDate = new Date(Date.parse(date))
         return stringToDate.toLocaleString('ru', {
            timeZone: 'Europe/Moscow',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
         })
      }
   }

   avatarsToRender = () => {
      return this.props.payers.map((payer) => (
         <div
            className={styles.travelers__avatar}
            title={payer.user.nickName}
            key={payer._id}
         >
            {!payer.user.avatar && payer.user.nickName[0].toUpperCase()}
            {payer.user.avatar && (
               <img
                  src={this.AVATAR_URL + payer.user.avatar}
                  alt={payer.user.nickName}
               />
            )}
         </div>
      ))
   }

   render() {
      const {
         title,
         type,
         company,
         beginPoint,
         beginDate,
         endPoint,
         endDate,
         files,
         payers,
      } = this.props

      const routeDefaultCaptions = [
         {
            type: 'Транспорт',
            sectionTitle: 'Маршрут',
            company: 'Компания',
            beginPoint: 'Место отправления',
            endPoint: 'Место назначения',
         },
         {
            type,
            sectionTitle: 'Адрес',
            company: 'Название',
            beginPoint: 'Адрес не указан',
         },
      ]
      const captions = routeDefaultCaptions.find((c) => c.type === type)

      const cardIsPayed = payers.findIndex((payer) => payer.isPayer) >= 0

      const today = new Date().toLocaleDateString()
      const start = new Date(beginDate).toLocaleDateString()
      const finish = new Date(endDate).toLocaleDateString()
      const unexpiredCard =
         new Date(endDate) > new Date() || finish === '01.01.1970'

      return (
         <>
            <div
               className={
                  unexpiredCard
                     ? styles.card
                     : `${styles.card} ${styles.card_archiveCard}`
               }
               onClick={this.showFullInfo}
            >
               <div>
                  <div className={styles.card__header}>
                     <h2 className={styles.card__title} children={title} />
                     <p 
                        className={classNames(
                           styles.card__company,
                           !company && styles.defaultCaptions
                        )}
                        children={company || captions.company}
                     />
                  </div>

                  <div className={styles.card__badges}>
                     <ConfirmIcon
                        className={classNames(
                           styles.badges__icon,
                           files.length > 0 && styles.badges__icon_active
                        )}
                     />
                     <PaidIcon
                        className={classNames(
                           styles.badges__icon,
                           cardIsPayed && styles.badges__icon_active
                        )}
                     />
                  </div>
                  <div className={styles.card__route}>
                     <div className={styles.schema}>
                        {captions.beginPoint && 
                           <div className={classNames(
                              styles.schema__point,
                              start === today && unexpiredCard && 
                                 styles.schema__point_currentDate)}
                           />
                        }
                        {captions.endPoint && (
                           <>
                              <div className={classNames(
                                 styles.schema__path,
                                 finish === today && unexpiredCard && 
                                    styles.schema__path_currentDate)} />
                              <div className={classNames(
                                 styles.schema__point,
                                 finish === today && unexpiredCard && 
                                    styles.schema__point_currentDate)} />
                           </>
                        )}
                     </div>

                     <div className={styles.route}>
                        <div className={styles.route__start}>
                           <span
                              className={classNames(
                                 styles.route__place,
                                 !beginPoint && styles.defaultCaptions
                              )}
                              children={beginPoint || captions.beginPoint}
                           />
                          <span
                              className={classNames(
                                 styles.route__date,
                                 start === today && unexpiredCard &&
                                    styles.route__date_currentDate
                              )}
                              children={this.convertDate(beginDate)}
                           />
                        </div>
                        <div className={styles.route__finish}>
                           <span
                              className={classNames(
                                 styles.route__place,
                                 !endPoint && styles.defaultCaptions
                              )}
                              children={endPoint || captions.endPoint}
                           />
                           {/* TODO edit location of dates */}
                           <span 
                              className={classNames(
                                 styles.route__date,
                                 finish === today && unexpiredCard && 
                                    styles.route__date_currentDate
                              )} 
                              children={this.convertDate(endDate)}/>
                           
                        </div>
                     </div>
                  </div>
               </div>

               <div
                  className={styles.card__travelers}
                  children={this.avatarsToRender()}
               />
            </div>

            {this.state.fullInfoOpened && (
               <CardFull
                  toClose={this.closeFullInfo}
                  card={{ ...this.props }}
               />
            )}
         </>
      )
   }
}
