import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

import styles from './ChangePasswordPage.module.scss'

import { bindActionCreators } from 'redux'
import {
   getEmailPasswordChange,
   passwordChange,
} from '../../redux/auth/operations'

import { ReactComponent as Picture } from '../../assets/images/changePassword.svg'
import { ReactComponent as Logo } from '../../assets/images/icons/logo.svg'
import InputControl from '../../controls/Input/InputControl'
import Button from '../../controls/Button/Button'
import Alert from '../../controls/Alert/Alert'

class ChangePasswordPage extends React.Component {
   static propTypes = {
      getEmailPasswordChange: PropTypes.func,
      passwordChange: PropTypes.func,
      EmailPasswordChange: PropTypes.string,
   }

   state = {
      password: '',
      passwordErrorLabel: '',
   }

   handleChange = (event) => {
      this.setState({
         [event.target.name]: event.target.value,
      })
   }

   passwordIsValid = (value) => {
      value.length > 5
         ? this.setState({ passwordErrorLabel: '' })
         : this.setState({ passwordErrorLabel: 'Пароль менее 6 символов' })
   }

   changePassword = () => {
      const linkId = this.props.match.params.linkId
      this.props.passwordChange({
         linkId: linkId,
         password: this.state.password,
      })
   }

   componentDidMount = () => {
      const linkId = this.props.match.params.linkId
      if (linkId) {
         this.props.getEmailPasswordChange(linkId)
      }
   }

   render() {
      const { password, passwordErrorLabel } = this.state
      const { EmailPasswordChange } = this.props

      return (
         <>
            <div className={styles.page}>
               <div className={styles.page__imagesBlock}>
                  <Logo className={styles.page__logo} />
                  <Picture />
               </div>
               <div className={styles.page__form}>
                  <h1>Смена пароля</h1>
                  <InputControl
                     type="text"
                     name="email"
                     styles={styles.page__emailInput}
                     label={'Почта'}
                     value={EmailPasswordChange}
                     disabled={true}
                  />
                  <InputControl
                     type="password"
                     name="password"
                     styles={styles.page__passwordInput}
                     label={'Новый пароль'}
                     hintLabel={'не менее 6 символов'}
                     errorLabel={password && passwordErrorLabel}
                     value={password}
                     onChange={this.handleChange}
                     onBlur={(e) => this.passwordIsValid(e.target.value)}
                  />
                  <div className={styles.footer}>
                     <Button
                        onClick={this.changePassword}
                        text={'Сменить'}
                        disabled={
                           !EmailPasswordChange ||
                           !password ||
                           !!passwordErrorLabel
                        }
                     />
                  </div>
               </div>
            </div>
         </>
      )
   }
}

const mapStateToProps = ({ authReducer }) => ({
   EmailPasswordChange: authReducer.EmailPasswordChange,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         getEmailPasswordChange,
         passwordChange,
      },
      dispatch
   )

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage)
