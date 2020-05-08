import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.module.scss'

export default class Button extends Component {
   static propTypes = {
      onClick: PropTypes.func.isRequired,
      text: PropTypes.string.isRequired,
      size: PropTypes.oneOf(['small']),
      kind: PropTypes.oneOf(['cancel']),
   }


   render() {
      const { onClick, text, size, kind } = this.props

      return (
         <button
            onClick={onClick}
            className={classNames(
               styles.button,
               size && styles[`button_${size}`],
               kind && styles[`button_${kind}`]
            )}
            children={text}
         />
      )
   }
}
