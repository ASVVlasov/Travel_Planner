import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './TransportCardShort.module.scss'

import TransportCardFull from './TransportCardFull'
import { ReactComponent as ConfirmIcon } from '../../assets/images/icons/document.svg'
import { ReactComponent as PaidIcon } from '../../assets/images/icons/receipt.svg'

export default class TransportCard extends Component {
   static propTypes = {
      transport: PropTypes.string,
      company: PropTypes.string,
      departurePlace: PropTypes.string,
      departureDate: PropTypes.string,
      arrivalPlace: PropTypes.string,
      arrivalDate: PropTypes.string,
      attachments: PropTypes.arrayOf(PropTypes.object),
      payer: PropTypes.string,
      travelers: PropTypes.arrayOf(PropTypes.object),
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

   render() {
      const {
         transport,
         company,
         departurePlace,
         departureDate,
         arrivalPlace,
         arrivalDate,
         attachments,
         payer,
         travelers,
      } = this.props

      const avatars = travelers.map((traveler, index) => (
         <div className={styles.travelers__avatar} key={index}>
            {/* <img src={ traveler.avatarPath } alt={ traveler.login } title={ traveler.login } /> */}
         </div>
      ))

      return (
         <>
            <div className={styles.card} onClick={this.showFullInfo}>
               <div>
                  <div className={styles.card__header}>
                     <h2
                        className={styles.card__transport}
                        children={transport}
                     />
                     <p className={styles.card__company} children={company} />
                  </div>

                  <div className={styles.card__badges}>
                     <ConfirmIcon
                        className={classNames(
                           styles.badges__icon,
                           attachments.length > 0 && styles.badges__icon_active
                        )}
                     />
                     <PaidIcon
                        className={classNames(
                           styles.badges__icon,
                           !!payer && styles.badges__icon_active
                        )}
                     />
                  </div>

                  <div className={styles.card__route}>
                     <div className={styles.schema}>
                        <div className={styles.schema__point} />
                        <div className={styles.schema__path} />
                        <div className={styles.schema__point} />
                     </div>

                     <div className={styles.route}>
                        <div className={styles.route__start}>
                           <span
                              className={styles.route__place}
                              children={departurePlace}
                           />
                           <span
                              className={styles.route__date}
                              children={departureDate}
                           />
                        </div>
                        <div className={styles.route__finish}>
                           <span
                              className={styles.route__place}
                              children={arrivalPlace}
                           />
                           <span
                              className={styles.route__date}
                              children={arrivalDate}
                           />
                        </div>
                     </div>
                  </div>
               </div>

               <div className={styles.card__travelers} children={avatars} />
            </div>

            {this.state.fullInfoOpened && (
               <TransportCardFull
                  toClose={this.closeFullInfo}
                  {...this.props}
               />
            )}
         </>
      )
   }
}
