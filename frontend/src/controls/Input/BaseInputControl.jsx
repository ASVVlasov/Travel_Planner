import { Component } from 'react'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Input.module.scss'

export default class BaseInputControl extends Component {
   static propTypes = {
      value: PropTypes.any.isRequired,
      placeholder: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      hintLabel: PropTypes.string,
   }

   state = {
      value: this.props.value,
   }

   onChange = (evt) => {
      this.setState({ value: evt.target.value })
      this.props.onChange(evt.target)
   }

   render() {
      return (
         <input
            className={styles.control__input}
            type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.onChange}
         />
      )
   }
}
