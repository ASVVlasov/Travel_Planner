import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Registration.module.scss'
import { NavLink } from 'react-router-dom'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
   register,
   getInvitedEmail,
   registerByInvitation,
   login,
   emailConfirmation,
} from '../../redux/auth/operations'
import InputControl from '../../controls/Input/InputControl'
import Button from '../../controls/Button/Button'
import Switch from '../../controls/Switch/Switch'

class Registration extends Component {
   static propTypes = {
      register: PropTypes.func,
      login: PropTypes.func,
      regError: PropTypes.object,
      authError: PropTypes.object,
      invitedEmail: PropTypes.string,
      confirmedEmail: PropTypes.string,
   }

   state = {
      email: '',
      password: '',
      rememberMe: false,
      emailErrorLabel: '',
      passwordErrorLabel: '',
      tabs: [
         {
            _id: 'signin',
            title: 'Вход',
            emailPlaceholder: 'Email',
            passwordPlaceholder: 'Пароль',
            inputStyle: 'input__signin',
            btnText: 'Войти',
            btnOnClick: () => this.login(),
         },
         {
            _id: 'signup',
            title: 'Регистрация',
            emailLabel: 'Введите почту',
            emailHintLabel: 'она же будет логином',
            passwordLabel: 'Придумайте пароль',
            passwordHintLabel: 'не менее 6 символов',
            inputStyle: 'input__signup',
            btnText: 'Зарегистрироваться',
            btnOnClick: () => this.register(),
         },
      ],
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
   emailIsValid = (value) => {
      const reg = new RegExp(/^[\w._-]+@[\w._-]+(\.[a-z]{2,6})$/i)
      reg.test(value)
         ? this.setState({ emailErrorLabel: '' })
         : this.setState({ emailErrorLabel: 'Проверьте введеный email' })
   }

   register = async () => {
      const password = this.state.password
      const email = this.state.email.toLowerCase()

      const linkId = this.props.match.params.linkId
      if (linkId) {
         this.setState({ email: this.props.invitedEmail })
         await this.props.registerByInvitation({ linkId, password })
      } else {
         await this.props.register({ email, password })
      }

      if (!this.props.regError) {
         this.props.push('/home/signin')
      }
   }

   login = async () => {
      const { password, rememberMe } = this.state
      const email = this.state.email.toLowerCase()

      await this.props.login({ email, password, rememberMe })
      if (!this.props.authError) {
         this.props.push('/profile/travels')
      }
   }

   mapTabsToRender = () =>
      this.state.tabs.map((tab) => (
         <NavLink
            to={tab._id === 'signin' ? '/home/signin' : '/home/signup'}
            className={styles.tabs__link}
            activeClassName={styles.tabs__link_active}
            children={tab.title}
            key={tab._id}
         />
      ))

   componentDidMount = () => {
      const { tabs } = this.state
      const tab = tabs.find((tab) => tab._id === this.props.match.params.tab)
      const linkId = this.props.match.params.linkId

      if (tab._id === 'signup' && linkId) {
         this.props.getInvitedEmail(linkId)
      } else if (tab._id === 'signin' && linkId) {
         this.props.emailConfirmation(linkId)
      }
   }
   componentDidUpdate = (prevProps) => {
      const { invitedEmail, confirmedEmail } = this.props
      if (
         prevProps.invitedEmail !== invitedEmail ||
         prevProps.confirmedEmail !== confirmedEmail
      ) {
         this.setState({ email: invitedEmail || confirmedEmail })
      }
   }

   render() {
      const {
         email,
         password,
         emailErrorLabel,
         passwordErrorLabel,
         tabs,
      } = this.state
      const { invitedEmail, confirmedEmail, match } = this.props

      const tab = tabs.find((tab) => tab._id === match.params.tab)

      return (
         <div className={styles.form}>
            <nav className={styles.tabs} children={this.mapTabsToRender()} />
            <InputControl
               type="text"
               name="email"
               styles={styles[tab.inputStyle]}
               placeholder={tab.emailPlaceholder}
               label={tab.emailLabel}
               hintLabel={tab.emailHintLabel}
               errorLabel={email && emailErrorLabel}
               value={email}
               disabled={!!invitedEmail || !!confirmedEmail}
               onChange={this.handleChange}
               onBlur={(e) => this.emailIsValid(e.target.value)}
            />
            <InputControl
               type="password"
               name="password"
               styles={styles[tab.inputStyle]}
               placeholder={tab.passwordPlaceholder}
               label={tab.passwordLabel}
               hintLabel={tab.passwordHintLabel}
               errorLabel={password && passwordErrorLabel}
               value={password}
               onChange={this.handleChange}
               onBlur={(e) => this.passwordIsValid(e.target.value)}
            />
            {this.props.match.params.tab === 'signin' && (
               <Switch
                  labelText="запомнить меня"
                  checked={this.props.rememberMe}
                  className={styles.switch}
                  onChange={(value) => {
                     this.setState({
                        rememberMe: value,
                     })
                  }}
               />
            )}
            <Button
               onClick={tab.btnOnClick}
               text={tab.btnText}
               disabled={
                  !email ||
                  !password ||
                  !!emailErrorLabel ||
                  !!passwordErrorLabel
               }
            />
         </div>
      )
   }
}
const mapStateToProps = ({ fetchReducer, authReducer }) => ({
   regError: fetchReducer.registerError,
   authError: fetchReducer.loginError,
   invitedEmail: authReducer.invitedEmail,
   confirmedEmail: authReducer.confirmedEmail,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         register,
         login,
         push,
         getInvitedEmail,
         registerByInvitation,
         emailConfirmation,
      },
      dispatch
   )

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
