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
         <div className={styles.travelers__avatar} key={payer._id}>
            {/* <img src={ payer.user.avatar } alt={ payer.user.nickName } title={ payer.user.nickName } /> */}
         </div>
      ))
   }

   render() {
      const {
         title,
         company,
         beginPoint,
         beginDate,
         endPoint,
         endDate,
         files,
         payers,
      } = this.props

      const cardIsPayed = payers.findIndex((payer) => payer.isPayer) >= 0

      return (
         <>
            <div className={styles.card} onClick={this.showFullInfo}>
               <div>
                  <div className={styles.card__header}>
                     <h2 className={styles.card__title} children={title} />
                     <p className={styles.card__company} children={company} />
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
                        {beginPoint && <div className={styles.schema__point} />}
                        {endPoint && (
                           <>
                              <div className={styles.schema__path} />
                              <div className={styles.schema__point} />
                           </>
                        )}
                     </div>

                     <div className={styles.route}>
                        <div className={styles.route__start}>
                           <span
                              className={styles.route__place}
                              children={beginPoint}
                           />
                           <span
                              className={styles.route__date}
                              children={this.convertDate(beginDate)}
                           />
                        </div>
                        <div className={styles.route__finish}>
                           <span
                              className={styles.route__place}
                              children={endPoint}
                           />
                           <span
                              className={styles.route__date}
                              children={this.convertDate(endDate)}
                           />
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
