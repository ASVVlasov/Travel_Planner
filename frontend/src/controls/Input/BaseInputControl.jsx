import { Component } from 'react'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Input.module.scss'
import { ReactComponent as EyeHide } from '../../assets/images/icons/eye-hide.svg'
import { ReactComponent as EyeShow } from '../../assets/images/icons/eye-show.svg'

export default class BaseInputControl extends Component {
   static propTypes = {
      type: PropTypes.string.isRequired,
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
      isPasswordVisible: false,
      isPasswordInput: false,
      type: '',
   }

   onChange = (evt) => {
      this.setState({ value: evt.target.value })
      this.props.onChange(evt.target)
   }

   switchVisible = (e) => {
      const { isPasswordVisible } = this.state
      this.setState({
         isPasswordVisible: !isPasswordVisible,
         type: isPasswordVisible ? 'password' : 'text',
      })
   }

   componentDidMount() {
      this.setState({
         value: this.props.value,
         type: this.props.type,
         isPasswordInput: this.props.type === 'password',
      })
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.value !== this.props.value) {
         this.setState({ value: this.props.value })
      }
   }

   render() {
      return (
         <div className={styles.control__inputWrap}>
            <input
               className={`${styles.control__input} ${
                  this.props.disabled && styles.control__input_disabled
               }`}
               type={this.state.type}
               name={this.props.name}
               placeholder={this.props.placeholder}
               value={this.state.value}
               onChange={this.onChange}
               disabled={this.props.disabled}
            />
            {this.state.isPasswordInput &&
               (this.state.isPasswordVisible ? (
                  <EyeHide
                     className={styles.control__eye}
                     onClick={this.switchVisible}
                  />
               ) : (
                  <EyeShow
                     className={styles.control__eye}
                     onClick={this.switchVisible}
                  />
               ))}
         </div>
      )
   }
}
