import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import classNames from 'classnames'
import styles from './TransportCardFull.module.scss'

import ModalBase from '../../controls/ModalBase/ModalBase'

export default class TransportCardFull extends Component {
   static propTypes = {
      toClose: PropTypes.func.isRequired,
   }

   render() {
      return (
         <ModalBase>
            <div className={styles.card__window} onClick={this.props.toClose}>
               <div className={styles.card__header}></div>
               <div className={styles.card__body}></div>
               <div className={styles.card__footer}></div>
            </div>
         </ModalBase>
      )
   }
}
