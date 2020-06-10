import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './CardForm.module.scss'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import InputControl from '../../controls/Input/InputControl'

export default class CardForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      addCard: PropTypes.func.isRequired,
      saveCard: PropTypes.func.isRequired,
      captions: PropTypes.object.isRequired,
      card: PropTypes.object,
   }

   state = {
      title: '',
      company: '',
      beginPoint: '',
      beginDate: '',
      endPoint: '',
      endDate: '',
   }

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   componentDidMount() {
      if (this.props.card) {
         this.setState({
            ...this.state,
            ...this.props.card,
         })
      }
   }

   render() {
      const { onClose, captions, card, addCard, saveCard } = this.props
      const formTitle = card ? 'Редактировать' : 'Добавить'

      const {
         title,
         company,
         beginPoint,
         beginDate,
         endPoint,
         endDate,
      } = this.state

      return (
         <ModalBase toClose={onClose}>
            <div className={styles.form}>
               <span
                  className={styles.form__title}
                  children={`${formTitle} ${captions.categoryRus.toLowerCase()}`}
               />
               <CloseIcon className={styles.icon__close} onClick={onClose} />

               <div className={styles.form__inputs}>
                  <InputControl
                     label={`${captions.labels.title}*`}
                     type="text"
                     name="title"
                     styles={styles.input_title}
                     placeholder={captions.placeholders.title}
                     value={title}
                     onChange={this.handleChange}
                  />
                  <InputControl
                     label={captions.labels.company}
                     type="text"
                     name="company"
                     styles={styles.input_company}
                     placeholder={captions.placeholders.company}
                     value={company}
                     onChange={this.handleChange}
                  />
               </div>
               <div className={styles.form__inputs}>
                  <InputControl
                     label={captions.labels.beginPoint}
                     type="text"
                     name="beginPoint"
                     styles={styles.input_beginPoint}
                     placeholder={captions.placeholders.beginPoint}
                     value={beginPoint}
                     onChange={this.handleChange}
                  />
                  <InputControl
                     label={captions.labels.beginDate}
                     type="datetime"
                     name="beginDate"
                     value={beginDate}
                     styles={styles.input_beginDate}
                     onChange={this.handleChange}
                  />
               </div>
               <div className={styles.form__inputs}>
                  {captions.category !== 'entertainment' && (
                     <>
                        <InputControl
                           label={captions.labels.endPoint}
                           type="text"
                           name="endPoint"
                           styles={styles.input_endPoint}
                           hidden={captions.category === 'accomodation'}
                           placeholder={captions.placeholders.endPoint}
                           value={endPoint}
                           onChange={this.handleChange}
                        />
                        <InputControl
                           label={captions.labels.endDate}
                           type="datetime"
                           name="endDate"
                           styles={styles.input_endDate}
                           value={endDate}
                           onChange={this.handleChange}
                        />
                     </>
                  )}
               </div>

               <div className={styles.form__actions}>
                  <Button onClick={onClose} text="Отмена" type="cancel" />
                  {!card && (
                     <Button
                        onClick={() => addCard(this.state)}
                        text="Добавить"
                        ml={20}
                        disabled={!title}
                     />
                  )}
                  {!!card && (
                     <Button
                        onClick={() => saveCard(this.state)}
                        text="Готово"
                        ml={20}
                        disabled={!title}
                     />
                  )}
               </div>
            </div>
         </ModalBase>
      )
   }
}
