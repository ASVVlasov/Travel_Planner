import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './CardForm.module.scss'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { createCard, changeCard } from '../../redux/cards/operations'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import { ReactComponent as CrossIcon } from '../../assets/images/icons/cross.svg'

class CardForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      createCard: PropTypes.func.isRequired,
      changeCard: PropTypes.func.isRequired,
      travelId: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      card: PropTypes.object,
   }

   state = {
      type: '',
      title: '',
      company: '',
      beginPoint: '',
      beginDate: new Date().toISOString().split('.')[0],
      endPoint: '',
      endDate: new Date().toISOString().split('.')[0],
   }

   captions = [
      {
         category: 'transport',
         categoryRus: 'Транспорт',
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
         categoryRus: 'Проживание',
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
         categoryRus: 'Развлечения',
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

   addCard = (type) => {
      const { travelId, createCard, onClose } = this.props
      if (this.state.title) {
         createCard(travelId, { ...this.state, type })
         onClose()
      }
   }

   saveCard = () => {
      const { travelId, card, changeCard, onClose } = this.props
      changeCard(travelId, { ...card, ...this.state })
      onClose()
   }

   componentDidMount() {
      const { card } = this.props
      if (card) {
         const beginDate = card.beginDate ? card.beginDate.split('.')[0] : ''
         const endDate = card.endDate ? card.endDate.split('.')[0] : ''
         this.setState({
            ...this.state,
            ...card,
            beginDate,
            endDate,
         })
      }
   }

   render() {
      const { onClose, category, card } = this.props
      const formTitle = card ? 'Редактировать' : 'Добавить'

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

                  {category !== 'entertainment' && (
                     <>
                        <Input
                           styles={category === 'accomodation' && styles.hidden}
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
                        onClick={() => this.addCard(captions.categoryRus)}
                        text="Добавить"
                     />
                  )}
                  {!!card && <Button onClick={this.saveCard} text="Готово" />}
               </div>
            </div>
         </ModalBase>
      )
   }
}

const mapStateToProps = ({ boardReducer }) => ({
   travelId: boardReducer.travelId,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ createCard, changeCard }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CardForm)

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
