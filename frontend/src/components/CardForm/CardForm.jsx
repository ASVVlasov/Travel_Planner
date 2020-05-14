import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './CardForm.module.scss'
//redux
// import { bindActionCreators } from 'redux'
// import connect from 'react-redux/es/connect/connect'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import { ReactComponent as CrossIcon } from '../../assets/images/icons/cross.svg'

export default class CardForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      // createCard: PropTypes.func.isRequired,
      // changeCard: PropTypes.func.isRequired,
      // travelId: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      card: PropTypes.string,
   }

   state = {
      title: '',
      company: '',
      beginPoint: '',
      beginDate: '',
      endPoint: '',
      endDate: '',
   }

   captions = [
      {
         category: 'transport',
         categoryRus: 'транспорт',
         labels: {
            title: 'Тип транспорта',
            company: 'Компания',
            beginPoint: 'Откуда',
            beginDate: 'Отправление',
            endPoint: 'Куда',
            endDate: 'Прибытие',
         },
         placeholders: {
            title: 'Машина в аренду',
            company: 'EuropeCar',
            beginPoint: 'Прага, аэропорт',
            endPoint: 'Рига, центр города',
         },
      },
      {
         category: 'accomodation',
         categoryRus: 'проживание',
         labels: {
            title: 'Тип проживания',
            company: 'Название',
            beginPoint: 'Адрес',
            beginDate: 'Заселение',
            endDate: 'Выселение',
         },
         placeholders: {
            title: 'Отель',
            company: 'Radisson',
            beginPoint: 'Рязань, ул. Ленина, 20',
         },
      },
      {
         category: 'entertainment',
         categoryRus: 'развлечение',
         labels: {
            title: 'Вид развлечения',
            company: 'Название',
            beginPoint: 'Место',
            beginDate: 'Дата',
         },
         placeholders: {
            title: 'Выставка грибов',
            company: 'Рязанское полесье',
            beginPoint: 'Лес на востоке от города',
         },
      },
   ]

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   addCard = () => {
      console.log('created', this.state)
      // this.props.createCard()
      this.props.onClose()
   }
   saveCard = () => {
      console.log('saved', this.state)
      // const { travelId, card, changeCard, onClose} = this.props
      // const updCard = { ...card, ...this.state }
      // changeCard(travelId, updCard)
      this.props.onClose()
   }

   render() {
      const { onClose, category } = this.props
      const card = this.props.card || {}

      const {
         title,
         company,
         beginPoint,
         beginDate,
         endPoint,
         endDate,
      } = this.state

      const index = this.captions.findIndex((obj) => obj.category === category)
      const captions = { ...this.captions[index] }

      return (
         <ModalBase toClose={onClose}>
            <div className={styles.form}>
               <span
                  className={styles.form__title}
                  children={`Добавить ${captions.categoryRus}`}
               />
               <button
                  className={styles.icon__cross}
                  onClick={onClose}
                  children={<CrossIcon />}
               />

               <div className={styles.form__inputs}>
                  <Input
                     label={captions.labels.title}
                     type="text"
                     name="title"
                     placeholder={captions.placeholders.title}
                     value={title || card.title}
                     onChange={this.handleChange}
                  />
                  <Input
                     label={captions.labels.company}
                     type="text"
                     name="company"
                     placeholder={captions.placeholders.company}
                     value={company || card.company}
                     onChange={this.handleChange}
                  />

                  <Input
                     label={captions.labels.beginPoint}
                     type="text"
                     name="beginPoint"
                     placeholder={captions.placeholders.beginPoint}
                     value={beginPoint || card.beginPoint}
                     onChange={this.handleChange}
                  />
                  <Input
                     label={captions.labels.beginDate}
                     type="datetime-local"
                     name="beginDate"
                     value={beginDate || card.beginDate}
                     onChange={this.handleChange}
                  />

                  {category !== 'entertainment' && (
                     <>
                        <Input
                           styles={category === 'accomodation' && styles.hidden}
                           label={captions.labels.endPoint}
                           type="text"
                           name="endPoint"
                           placeholder={captions.placeholders.endPoint}
                           value={endPoint || card.endPoint}
                           onChange={this.handleChange}
                        />
                        <Input
                           label={captions.labels.endDate}
                           type="datetime-local"
                           name="endDate"
                           value={endDate || card.endDate}
                           onChange={this.handleChange}
                        />
                     </>
                  )}
               </div>

               <div className={styles.form__actions}>
                  <Button onClick={onClose} text="Отмена" kind="cancel" />
                  {!!card && <Button onClick={this.addCard} text="Добавить" />}
                  {!card && <Button onClick={this.saveCard} text="Готово" />}
               </div>
            </div>
         </ModalBase>
      )
   }
}

// const mapStateToProps = ({}) => ({})
// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)
// export default connect(null, null)(CardForm)

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
         onChange={(event) => props.onChange(event)}
      />
   </div>
)
