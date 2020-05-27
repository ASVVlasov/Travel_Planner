import { Component } from 'react'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Input.module.scss'

export default class BaseInputControl extends Component {
   static propTypes = {
      value: PropTypes.any.isRequired,
      placeholder: PropTypes.string,
      onChange: PropTypes.func,
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      hintLabel: PropTypes.string,
      disabled: PropTypes.bool,
   }

   state = {
      value: '',
   }

   onChange = (evt) => {
      this.setState({ value: evt.target.value })
      this.props.onChange(evt.target)
   }

   componentDidMount() {
      this.setState({ value: this.props.value })
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.value !== this.props.value) {
         this.setState({ value: this.props.value })
      }
   }

   render() {
      return (
         <input
            className={`${styles.control__input} ${
               this.props.disabled && styles.control__input_disabled
            }`}
            type="text"
            name={this.props.name}
            placeholder={this.props.placeholder}
            value={this.state.value}
            onChange={this.onChange}
            disabled={this.props.disabled}
         />
      )
   }
}
