import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Alert.module.scss'

import { fetchData } from '../../redux/fetch/operations'
import { clearError } from '../../redux/fetch/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import Button from '../Button/Button'

class Alert extends Component {
   state = {
      shown: false,
      success: {
         title: 'Все получилось!',
         text: this.props.message || 'Данные успешно сохранены, отвечаем 😎',
         style: styles.alert_success,
      },
      warning: {
         title: 'Тут такое дело...',
         text: this.props.message,
         style: styles.alert_warning,
      },
      error: {
         title: 'Что-то пошло не так...',
         text:
            this.props.message ||
            'Похоже, возникли проблемы со связью. Чтобы не потерять внесенные изменения, рекомендуем повторить отправку данных.',
         style: styles.alert_error,
      },
   }

   toClose = () => {
      this.setState({ shown: false })
      this.props.clearError(this.props.errName)
   }

   repeatLastRequest = () => {
      const { url, actions, body, method, headers } = this.props.argsForRequest
      this.props.fetchData(url, actions, body, method, headers)
      this.toClose()
   }

   componentDidMount = () => {
      this.setState({ shown: true })
   }

   render() {
      const typeAttr = this.state[this.props.type]

      return (
         <>
            {this.state.shown ? (
               <div className={`${styles.alert} ${typeAttr.style}`}>
                  <header className={styles.alert__header}>
                     <span
                        className={styles.alert__title}
                        children={typeAttr.title}
                     />
                     <CloseIcon
                        className={styles.icon}
                        onClick={this.toClose}
                     />
                  </header>
                  <p className={styles.alert__body} children={typeAttr.text} />

                  {this.props.type === 'error' && (
                     <Button
                        text="Повторить"
                        styleView="outline"
                        size="small"
                        kind="error"
                        onClick={this.repeatLastRequest}
                     />
                  )}
               </div>
            ) : null}
         </>
      )
   }
}

Alert.propTypes = {
   type: PropTypes.oneOf(['success', 'warning', 'error']).isRequired,
   errName: PropTypes.string.isRequired,
   message: function (props, propName, componentName) {
      if (props.type === 'warning' && props[propName] === undefined) {
         return new Error(
            `The prop \`${propName}\` is marked as required in \`${componentName}\` with type \`${props.type}\`, but its value is \`undefined\`.`
         )
      } else if (props[propName] && typeof props[propName] !== 'string') {
         return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\` with type \`${props.type}\`, expected \`string\`\`.`
         )
      }
   },
   argsForRequest: function (props, propName, componentName) {
      if (props.type === 'error') {
         if (props[propName] === undefined) {
            return new Error(
               `The prop \`${propName}\` is marked as required in \`${componentName}\` with type \`${props.type}\`, but its value is \`undefined\`.`
            )
         } else if (typeof props[propName] !== 'object') {
            return new Error(
               `Invalid prop \`${propName}\` supplied to \`${componentName}\` with type \`${props.type}\`, expected \`object\`\`.`
            )
         }
      }
   },
   fetchData: PropTypes.func.isRequired,
   clearError: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ fetchData, clearError }, dispatch)
export default connect(null, mapDispatchToProps)(Alert)
