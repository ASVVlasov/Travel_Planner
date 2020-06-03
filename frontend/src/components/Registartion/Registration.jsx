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
   }

   state = {
      email: '',
      password: '',
      rememberMe: false,
      tabs: [
         {
            _id: 'signin',
            title: 'Вход',
            emailPlaceholder: 'Email',
            emailLabel: '',
            emailHintLabel: '',
            passwordPlaceholder: 'Пароль',
            passwordLabel: '',
            passwordHintLabel: '',
            inputStyle: 'input',
            btnText: 'Войти',
         },
         {
            _id: 'signup',
            title: 'Регистрация',
            emailPlaceholder: '',
            emailLabel: 'Введите почту',
            emailHintLabel: 'она же будет логином',
            passwordPlaceholder: '',
            passwordLabel: 'Придумайте пароль',
            passwordHintLabel: 'не менее 6 символов',
            inputStyle: 'input_wide',
            btnText: 'Зарегистрироваться',
         },
      ],
   }
   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }
   passwordIsValid = (value) => (value.length > 5 ? true : false)
   emailIsValid = (value) => {
      const reg = new RegExp('^[w._-]+@(w+[.a-z])*$')
      return reg.test(value)
   }

   login = async () => {
      let authInfo = {}
      authInfo.email = this.state.email
      authInfo.password = this.state.password
      authInfo.rememberMe = this.state.rememberMe

      let tabs = this.state.tabs
      const index = this.state.tabs.findIndex(
         (tab) => tab._id === this.props.match.params.tab
      )

      if (!this.emailIsValid(authInfo.email)) {
         tabs[index].emailLabel =
            'Введите правильный email, например, example@mail.ru'
         this.setState({ tabs: tabs })
         return
      } else {
         tabs[index].emailLabel = index ? 'Введите почту' : ''
         this.setState({ tabs: tabs })
      }

      if (!this.passwordIsValid(authInfo.password)) {
         tabs[index].passwordLabel = 'Пароль должен быть не менее 6 символов'
         this.setState({ tabs: tabs })
         return
      } else {
         tabs[index].passwordLabel = index ? 'Придумайте пароль' : ''
         this.setState({ tabs: tabs })
      }
      await this.props
         .authorization(authInfo, '/' + this.props.match.params.tab)
         .then(
            () => {
               history.push('/profile/travels')
            },
            () => {}
         )
   }
   mapTabsToRender = () =>
      this.state.tabs.map((tab) => (
         <NavLink
            to={`${tab._id}`}
            className={styles['tabs-link']}
            activeClassName={styles['tabs-link_active']}
            children={tab.title}
            key={tab._id}
         />
      ))

   render() {
      const { email, password } = this.state
      const tab = this.state.tabs.find(
         (tab) => tab._id === this.props.match.params.tab
      )
      return (
         <div className={styles['form']}>
            <nav className={styles['tabs']} children={this.mapTabsToRender()} />
            <InputControl
               type="text"
               name="email"
               styles={styles[tab.inputStyle]}
               placeholder={tab.emailPlaceholder}
               label={tab.emailLabel}
               hintLabel={tab.emailHintLabel}
               value={email}
               onChange={this.handleChange}
            />
            <InputControl
               type="password"
               name="password"
               styles={styles[tab.inputStyle]}
               placeholder={tab.passwordPlaceholder}
               label={tab.passwordLabel}
               hintLabel={tab.passwordHintLabel}
               value={password}
               onChange={this.handleChange}
            />
            {this.props.match.params.tab === 'signin' && (
               <Switch
                  labelText="Запомнить меня"
                  checked={this.props.rememberMe}
                  className={styles['switch']}
                  onChange={(value) => {
                     this.setState({ rememberMe: value })
                  }}
               />
            )}
            <Button onClick={this.login} text={tab.btnText} ml={0} />
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ authorization }, dispatch)

export default connect(null, mapDispatchToProps)(Registration)
