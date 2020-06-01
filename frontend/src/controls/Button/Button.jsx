import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.module.scss'

export default class Button extends Component {
   static propTypes = {
      onClick: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired,
      kind: PropTypes.oneOf(['action', 'cancel', 'delete']),
      disabled: PropTypes.bool,
      ml: PropTypes.number,
   }

   render() {
      const { onClick, text, kind, disabled, ml } = this.props

      return (
         <button
            onClick={onClick}
            className={classNames(
               styles.button,
               kind && styles[`button_${kind}`]
            )}
            style={{ marginLeft: ml + 'px' }}
            children={text}
            disabled={disabled}
         />
      )
   }
}
