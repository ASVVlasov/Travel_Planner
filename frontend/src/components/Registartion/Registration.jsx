import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Registration.module.scss'
import { NavLink } from 'react-router-dom'
import { history } from '../../redux/store'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { authorization } from '../../redux/auth/operations'
import InputControl from '../../controls/Input/InputControl'
import Button from '../../controls/Button/Button'
import Switch from '../../controls/Switch/Switch'

class Registration extends Component {
   static propTypes = {
      authorization: PropTypes.func,
      reqError: PropTypes.string,
   }

   state = {
      email: '',
      password: '',
      rememberMe: false,
      emailErrorLabel: '',
      passwordErrorLabel: '',
      signInError: '',
      tabs: [
         {
            _id: 'signin',
            title: 'Вход',
            emailPlaceholder: 'Email',
            passwordPlaceholder: 'Пароль',
            inputStyle: 'input__signin',
            btnText: 'Войти',
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

   login = async () => {
      const { password, rememberMe } = this.state
      const email = this.state.email.toLowerCase()

      this.setState({ signInError: '' })

      await this.props.authorization(
         { email, password, rememberMe },
         '/' + this.props.match.params.tab
      )

      if (this.props.reqError) {
         // TODO: Сделать вывод соолбщения об ошибке
         alert('Введен неправильный логин/пароль')
      } else {
         history.push('/profile/travels')
      }
   }

   mapTabsToRender = () =>
      this.state.tabs.map((tab) => (
         <NavLink
            to={`${tab._id}`}
            className={styles.tabs__link}
            activeClassName={styles.tabs__link_active}
            children={tab.title}
            key={tab._id}
         />
      ))

   render() {
      const {
         email,
         password,
         emailErrorLabel,
         passwordErrorLabel,
         tabs,
      } = this.state
      const tab = tabs.find((tab) => tab._id === this.props.match.params.tab)

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
               onClick={this.login}
               text={tab.btnText}
               disabled={
                  !email || !password || emailErrorLabel || passwordErrorLabel
               }
            />
         </div>
      )
   }
}
const mapStateToProps = ({ userReducer }) => ({
   reqError: userReducer.reqError,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ authorization }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
