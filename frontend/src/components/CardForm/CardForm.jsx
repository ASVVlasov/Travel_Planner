import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './CardForm.module.scss'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import { ReactComponent as CrossIcon } from '../../assets/images/icons/cross.svg'

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
      beginDate: new Date().toISOString().split('.')[0],
      endPoint: '',
      endDate: new Date().toISOString().split('.')[0],
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
               <button
                  className={styles.icon__cross}
                  onClick={onClose}
                  children={<CrossIcon />}
               />

               <div className={styles.form__inputs}>
                  <Input
                     label={`${captions.labels.title}*`}
                     type="text"
                     name="title"
                     placeholder={captions.placeholders.title}
                     value={title}
                     onChange={this.handleChange}
                  />
                  <Input
                     label={captions.labels.company}
                     type="text"
                     name="company"
                     placeholder={captions.placeholders.company}
                     value={company}
                     onChange={this.handleChange}
                  />

                  <Input
                     label={captions.labels.beginPoint}
                     type="text"
                     name="beginPoint"
                     placeholder={captions.placeholders.beginPoint}
                     value={beginPoint}
                     onChange={this.handleChange}
                  />
                  <Input
                     label={captions.labels.beginDate}
                     type="datetime-local"
                     name="beginDate"
                     value={beginDate}
                     onChange={this.handleChange}
                  />

                  {captions.category !== 'entertainment' && (
                     <>
                        <Input
                           styles={
                              captions.category === 'accomodation' &&
                              styles.hidden
                           }
                           label={captions.labels.endPoint}
                           type="text"
                           name="endPoint"
                           placeholder={captions.placeholders.endPoint}
                           value={endPoint}
                           onChange={this.handleChange}
                        />
                        <Input
                           label={captions.labels.endDate}
                           type="datetime-local"
                           name="endDate"
                           value={endDate}
                           onChange={this.handleChange}
                        />
                     </>
                  )}
               </div>

               <div className={styles.form__actions}>
                  <Button onClick={onClose} text="Отмена" kind="cancel" />
                  {!card && (
                     <Button
                        onClick={() => addCard(this.state)}
                        text="Добавить"
                     />
                  )}
                  {!!card && (
                     <Button
                        onClick={() => saveCard(this.state)}
                        text="Готово"
                     />
                  )}
               </div>
            </div>
         </ModalBase>
      )
   }
}

const Input = (props) => (
   <div
      className={`${styles.input__block} ${
         styles[`input__block_${props.name}`]
      } ${props.styles}`}
   >
      <label
         className={styles.label}
         htmlFor={props.name}
         children={props.label}
      />
      <input
         className={styles.input}
         type={props.type}
         name={props.name}
         placeholder={props.placeholder}
         value={props.value}
         onChange={(event) => {
            props.onChange(event)
         }}
      />
   </div>
)
