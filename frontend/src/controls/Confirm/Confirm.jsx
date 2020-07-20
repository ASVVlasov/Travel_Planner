import React from 'react'
import PropTypes from 'prop-types'
import styles from './Confirm.module.scss'
import ModalBase from '../ModalBase/ModalBase'
import Button from '../../controls/Button/Button'

export default class Confirm extends React.Component {
   static propTypes = {
      type: PropTypes.oneOf([
         'deleteTravel',
         'leaveTravel',
         'deleteTraveler',
         'deleteCard',
      ]).isRequired,
      onClose: PropTypes.func.isRequired,
      act: PropTypes.func.isRequired,
      userNameToDelete: PropTypes.string,
   }

   state = {
      deleteTravel: {
         style: styles.confirm_deleteTravel,
      },
      leaveTravel: {
         style: styles.confirm_leaveTravel,
      },
      deleteTraveler: {
         style: styles.confirm_deleteTraveler,
      },
      deleteCard: {
         style: styles.confirm_deleteCard,
      },
   }

   deleteTravelText = () => {
      return (
         <div className={styles.confirm__content}>
            <p>Вы уверены, что хотите удалить поездку? </p>
            <p>
               Все данные, относящиеся к ней, будут потеряны <br />
               <span>Данное действие невозможно будет отменить</span>
            </p>
         </div>
      )
   }

   leaveTravelText = () => {
      return (
         <div className={styles.confirm__content}>
            <p>Вы уверены, что хотите покинуть поездку? </p>
            <p>
               Все данные о вашем участии в ней будут потеряны <br />
               <span>Данное действие невозможно будет отменить</span>
            </p>
         </div>
      )
   }

   deleteTravelerText = () => {
      return (
         <div className={styles.confirm__content}>
            <p>
               {'Вы уверены, что хотите удалить из поездки '}
               {this.props.userNameToDelete}?
            </p>
            <p>
               Пользователь будет удален из всех карточек, что может привести к
               перерасчету бюджета для других участников поездки. <br />
               <span>Данное действие невозможно будет отменить.</span>
            </p>
            <p>
               Пользователя можно добавить в поездку повторно, но во все
               карточки его нужно будет добавлять заново.
            </p>
         </div>
      )
   }

   deleteCardText = () => {
      return (
         <div className={styles.confirm__content}>
            <p>Вы уверены, что хотите удалить карточку? </p>
            <p>
               Все данные, относящиеся к ней, будут потеряны <br />
               <span>Данное действие невозможно будет отменить</span>
            </p>
         </div>
      )
   }

   render() {
      const { onClose, act, type } = this.props
      const style = this.state[type].style
      let confirmationButtonText = 'Удалить'
      let information

      switch (type) {
         case 'deleteTravel': {
            information = this.deleteTravelText
            break
         }
         case 'leaveTravel': {
            information = this.leaveTravelText
            confirmationButtonText = 'Покинуть'
            break
         }
         case 'deleteTraveler': {
            information = this.deleteTravelerText
            break
         }
         case 'deleteCard': {
            information = this.deleteCardText
            break
         }
         default: {
            break
         }
      }

      return (
         <ModalBase toClose={onClose}>
            <div className={`${styles.confirm} ${style}`}>
               <h1>Надо кое-что уточнить...</h1>
               {information()}
               <div className={styles.confirm__buttonBlock}>
                  <Button onClick={onClose} type="cancel" text="Отмена" />
                  <Button
                     onClick={act}
                     type="delete"
                     text={confirmationButtonText}
                  />
               </div>
            </div>
         </ModalBase>
      )
   }
}
