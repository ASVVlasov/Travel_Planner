import React from 'react'
import PropTypes from 'prop-types'
import styles from './switch.module.scss'

export default class Switch extends React.Component {
   static propTypes = {
      labelText: PropTypes.string,
   }
   render() {
      return (
         <label className={styles.switch__label}>
            <div className={styles.switch__toggle}>
               <input
                  className={styles.switch__toggleState}
                  type="checkbox"
                  name="check"
                  value="check"
               />
               <div className={styles.switch__toggleInner}>
                  <div className={styles.switch__indicator}></div>
               </div>
               <div className={styles.switch__activeBg}></div>
            </div>
            <div
               className={styles.switch__labelText}
               children={this.props.labelText}
            />
         </label>
      )
   }
}
