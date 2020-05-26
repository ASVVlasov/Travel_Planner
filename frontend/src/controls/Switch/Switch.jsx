import React from 'react'
import PropTypes from 'prop-types'
import styles from './switch.module.scss'
import classNames from 'classnames'


export default class Switch extends React.Component {
   static propTypes = {
      labelText: PropTypes.string,
      checked: PropTypes.bool,
      onChange: PropTypes.func,
      checkedGreenColor: PropTypes.bool,
   }
   onChangeFunction = (e) => {
      if (this.props.onChange) {
         this.props.onChange(e.target.checked)
      }
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
                  checked={this.props.checked}
                  onChange={this.onChangeFunction}
               />
               <div className={styles.switch__toggleInner}>
                  <div className={styles.switch__indicator}></div>
               </div>

               <div className={classNames(
                  styles.switch__activeBg,
                  this.props.checkedGreenColor &&
                     styles.switch__activeBg_colored)}
               />
            </div>
            <div
               className={styles.switch__labelText}
               children={this.props.labelText}
            />
         </label>
      )
   }
}
