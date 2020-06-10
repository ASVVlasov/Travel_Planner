import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Alert.module.scss'

import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import Button from '../Button/Button'

export default class Alert extends Component {
   state = {
      shown: false,
      success: {
         title: 'Все получилось!',
         text: this.props.alertText || 'Данные успешно сохранены, отвечаем 😎',
         style: styles.alert_success,
      },
      warning: {
         title: 'Тут такое дело...',
         text: this.props.alertText,
         style: styles.alert_warning,
      },
      error: {
         title: 'Что-то пошло не так...',
         text:
            'Похоже, возникли проблемы со связью. Чтобы не потерять внесенные изменения, рекомендуем повторить отправку данных.',
         style: styles.alert_error,
      },
   }

   toClose = () => {
      this.setState({ shown: false })
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
                        onClick={() => {
                           this.props.requestForRepeat()
                           this.toClose()
                        }}
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
   alertText: function (props, propName, componentName) {
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
   requestForRepeat: function (props, propName, componentName) {
      if (props.type === 'error') {
         if (props[propName] === undefined) {
            return new Error(
               `The prop \`${propName}\` is marked as required in \`${componentName}\` with type \`${props.type}\`, but its value is \`undefined\`.`
            )
         } else if (typeof props[propName] !== 'function') {
            return new Error(
               `Invalid prop \`${propName}\` supplied to \`${componentName}\` with type \`${props.type}\`, expected \`function\`\`.`
            )
         }
      }
   },
}
