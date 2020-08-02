import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ResetForm.module.scss'

import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { sendFeedback } from '../../redux/feedback/operations.js'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import InputControl from '../../controls/Input/InputControl'
import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'

class FeedbackForm extends Component {
   static propTypes = {
      sendFeedback: PropTypes.func.isRequired,
      onClose: PropTypes.func.isRequired,
   }

   state = {
      email: '',
      emailErrorLabel: '',
      emailPlaceholder: 'Email',
      emailLabel: 'Почта, указанная при регистрации',
      isValid: false,
   }

   handleEmailInput = async (event) => {
      this.setState({ [event.target.name]: event.target.value })
      await this.emailValidate(event.target.value)
      if (!event.target.value || this.state.isValid) {
         this.setState({ emailErrorLabel: '' })
      } else {
         this.setState({ emailErrorLabel: 'Проверьте введеный email' })
      }
   }

   submit = async () => {
      await this.props.sendFeedback({ comment: this.state.comment })
      this.props.onClose()
   }
   emailValidate = async (value) => {
      const reg = new RegExp(/^[\w._-]+@[\w._-]+(\.[a-z]{2,6})$/i)
       await this.setState((prevState) => { return { prevState.isValid = reg.test(value) } })
   }

   render() {
      const { onClose } = this.props
      const {
         isValid,
         emailPlaceholder,
         emailLabel,
         email,
         emailErrorLabel,
      } = this.state

      return (
         <ModalBase>
            <div className={styles.form}>
               <div className={styles.form__header}>
                  <span
                     className={styles.form__title}
                     children="Забыл пароль"
                  />
                  <CloseIcon className={styles.icon__close} onClick={onClose} />
               </div>

               <div className={styles.form__caption}>
                  Забытый пароль можно сбросить и&nbsp;придумать вместо него
                  новый: для этого введите почту, на&nbsp;неё придет уникальная
                  ссылка для смены пароля
               </div>
               <InputControl
                  type="text"
                  name="email"
                  styles={styles.form__emailInput}
                  placeholder={emailPlaceholder}
                  label={emailLabel}
                  errorLabel={emailLabel && emailErrorLabel}
                  value={email}
                  onChange={this.handleEmailInput}
                  onBlur={(e) => this.emailValidate(e.target.value)}
               />
               <div className={styles.form__actions}>
                  <Button onClick={onClose} text="Отмена" type="cancel" />
                  <Button
                     onClick={this.submit}
                     disabled={!isValid}
                     text="Сбросить пароль"
                     ml={20}
                  />
               </div>
            </div>
         </ModalBase>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ sendFeedback }, dispatch)

export default connect(null, mapDispatchToProps)(FeedbackForm)
