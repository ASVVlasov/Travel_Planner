import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Alert.module.scss'

import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import Button from '../Button/Button'

export default class Alert extends Component {
   static propTypes = {
      type: PropTypes.oneOf(['success', 'warning', 'error']),
      warningText: PropTypes.string,
      requestForRepeat: PropTypes.func,
   }

   state = {
      success: {
         title: 'Все получилось!',
         text: 'Данные успешно обновлены, отвечаем 😎',
         style: styles.alert_success,
      },
      warning: {
         title: 'Тут такое дело...',
         text: this.props.warningText,
         style: styles.alert_warning,
      },
      error: {
         title: 'Что-то пошло не так...',
         text:
            'Похоже, возникли проблемы со связью. Чтобы не потерять внесенные изменения, рекомендуем повторить отправку данных.',
         style: styles.alert_error,
      },
   }

   render() {
      const typeAttr = this.state[this.props.type]

      return (
         <div className={`${styles.alert} ${typeAttr.style}`}>
            <header className={styles.alert__header}>
               <span
                  className={styles.alert__title}
                  children={typeAttr.title}
               />
               <CloseIcon
                  className={styles.icon}
                  onClick={() => {
                     console.log('clicked')
                  }}
               />
            </header>
            <p className={styles.alert__body} children={typeAttr.text} />

            {this.props.type === 'error' && (
               <Button
                  text="Повторить"
                  styleView="outline"
                  size="small"
                  kind="error"
                  onClick={this.props.requestForRepeat}
               />
            )}
         </div>
      )
   }
}
