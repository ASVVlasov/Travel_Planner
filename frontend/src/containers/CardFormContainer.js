import CardForm from '../components/CardForm/CardForm'

import { connect } from 'react-redux'
import { createCard, changeCard } from '../redux/cards/operations'
import { withRouter } from 'react-router-dom'

const captionsLib = [
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
      categoryRus: 'Досуг',
      labels: {
         title: 'Вид досуга',
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

const mergeProps = (stateProps, dispatchProps, ownProps) => {
   const { dispatch } = dispatchProps

   const {
      onClose,
      match: {
         params: { travelId, board },
      },
   } = ownProps

   let { card } = ownProps

   const index = captionsLib.findIndex((obj) => obj.category === board)
   const captions = captionsLib[index]
   const type = captions.categoryRus

   if (card) {
      const beginDate = card.beginDate || ''
      const endDate = card.endDate || ''
      card = { ...card, beginDate, endDate }
   }

   const addCard = (cardFields) => {
      if (cardFields.title) {
         dispatch(createCard({ travelId, type, ...cardFields }))
         onClose()
      }
   }

   const saveCard = (updFields) => {
      dispatch(changeCard({ ...card, ...updFields }))
      onClose()
   }

   return {
      captions,
      addCard,
      saveCard,
      onClose,
      card,
   }
}

export default withRouter(connect(null, null, mergeProps)(CardForm))
