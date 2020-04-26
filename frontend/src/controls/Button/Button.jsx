import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.module.scss'

export default class Button extends Component {
   static propTypes = {
      text: PropTypes.string.isRequired,
      size: PropTypes.string,       // options: 'small'
      kind: PropTypes.string,       // options: 'cancel'
   }

   render () {
      const { text, size, kind } = this.props

      return (
         <button 
            className={ classNames(
               styles.button,
               size && styles[`button_${size}`],
               kind && styles[`button_${kind}`]) 
            } 
            children={ text }
         />
      )
   }
}


