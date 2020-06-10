import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.module.scss'

export default class Button extends Component {
   static propTypes = {
      onClick: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired,
      styleView: PropTypes.oneOf(['outline']),
      type: PropTypes.oneOf(['action', 'cancel', 'delete']),
      kind: PropTypes.oneOf(['error', 'success', 'warning']),
      size: PropTypes.oneOf(['small']),
      disabled: PropTypes.bool,
      ml: PropTypes.number,
   }

   render() {
      const {
         onClick,
         text,
         styleView,
         type,
         kind,
         size,
         disabled,
         ml,
      } = this.props

      return (
         <button
            onClick={onClick}
            className={classNames(
               styles.button,
               styleView && styles[`button_${styleView}`],
               type && styles[`button_${type}`],
               kind && styles[`button_${kind}`],
               size && styles[`button_${size}`]
            )}
            style={{ marginLeft: ml + 'px' }}
            children={text}
            disabled={disabled}
         />
      )
   }
}
