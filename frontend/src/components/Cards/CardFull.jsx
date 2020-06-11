import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './CardFull.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
   changeCard,
   deleteCard,
   uploadFile,
   deleteFile,
   changePayerStatus,
} from '../../redux/cards/operations'
import { getBudget } from '../../redux/travel/operations'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import Switch from '../../controls/Switch/Switch'
import CardFormContainer from '../../containers/CardFormContainer'
import UserPicker from '../../controls/UserPicker/UserPicker'

import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import { ReactComponent as EditIcon } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as AddIcon } from '../../assets/images/icons/plus.svg'

class CardFull extends Component {
   static propTypes = {
      toClose: PropTypes.func.isRequired,
      changeCard: PropTypes.func.isRequired,
      deleteCard: PropTypes.func.isRequired,
      uploadFile: PropTypes.func.isRequired,
      deleteFile: PropTypes.func.isRequired,
      changePayerStatus: PropTypes.func.isRequired,
      getBudget: PropTypes.func.isRequired,
      card: PropTypes.object.isRequired,
   }

   state = {
      comment: '',
      cost: 0,
      isCardFormOpen: false,
      isUserPickerOpen: false,
      userPickerPosition: {},
   }

   //TODO remove
   URL = window.location.port ? 'http://localhost:3300' : window.location.origin
   FILE_URL = this.URL + '/card/file/'
   AVATAR_URL = this.URL + '/user/avatar/'

   openForm = (formName) => {
      this.setState({ [`is${formName}Open`]: true })
   }

   closeForm = (formName) => {
      this.setState({ [`is${formName}Open`]: false })
   }

   setPosition = (x, y) => {
      return {
         position: 'absolute',
         top: y + 'px',
         left: x + 'px',
      }
   }

   commentInput = createRef()
   filesInput = createRef()
   costInput = createRef()

   focusInput = (input) => {
      input.focus()
      if (input.name === 'comment') {
         input.setSelectionRange(input.value.length, input.value.length)
      }
   }

   uploadFileHandler = (e) => {
      const { card, uploadFile } = this.props

      const file = new FormData()
      file.append('travelId', card.travelId)
      file.append('cardId', card._id)
      file.append('files', e.target.files[0])

      uploadFile(file)
      e.target.value = null
   }

   deleteFileHandler = (fileId) => {
      const { card, deleteFile } = this.props
      deleteFile({ fileId, cardId: card._id })
   }

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   updateCard = (changedArea, newValue) => {
      const card = { ...this.props.card }

      if (card[changedArea] !== newValue) {
         card[changedArea] = newValue
         this.props.changeCard(card)
      }
   }

   convertDate = (date = null) => {
      if (date) {
         const stringToDate = new Date(Date.parse(date))
         return stringToDate.toLocaleString('ru', {
            timeZone: 'Europe/Moscow',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
         })
      }
   }

   filesToRender = () => {
      return this.props.card.files.map((file) => (
         <span key={file._id} className={styles.docs__file}>
            <a
               download
               href={this.FILE_URL + file._id}
               children={file.fileName}
               className={styles.docs__link}
            />
            <CloseIcon
               className={classNames(styles.icons, styles.icons__delete)}
               onClick={() => this.deleteFileHandler(file._id)}
            />
         </span>
      ))
   }

   changeMainPayer = (e, mainPayer) => {
      const { card, changePayerStatus } = this.props

      card.payers.forEach((payer) => {
         payer._id === mainPayer._id
            ? changePayerStatus({ ...payer, isPayer: e })
            : changePayerStatus({ ...payer, isPayer: false })
      })
   }

   payersToRender = () => {
      const { card, changePayerStatus, getBudget, userId } = this.props

      return card.payers.map((payer) => (
         <div className={styles.travelers__person} key={payer._id}>
            <div
               className={styles.travelers__avatar}
               title={payer.user.nickName}
            >
               {!payer.user.avatar && payer.user.nickName[0]}
               {payer.user.avatar && (
                  <img
                     src={this.AVATAR_URL + payer.user.avatar}
                     alt={payer.user.nickName}
                  />
               )}
            </div>
            <span
               className={classNames(
                  styles.travelers__name,
                  payer.user._id === userId && styles.travelers__name_itsMe
               )}
               title={payer.user.nickName}
               children={
                  !!payer.user.name || !!payer.user.surname
                     ? payer.user.name + ' ' + payer.user.surname
                     : payer.user.nickName
               }
            />
            <div
               className={styles.travelers__switch}
               children={
                  <Switch
                     checkedGreenColor={payer.user._id === userId}
                     checked={payer.isPayer}
                     onChange={(e) => {
                        this.changeMainPayer(e, payer)
                        getBudget(card.travelId)
                     }}
                  />
               }
            />
            <div
               className={styles.travelers__switch}
               children={
                  <Switch
                     checkedGreenColor={payer.user._id === userId}
                     checked={payer.hasPayed}
                     onChange={(e) => {
                        changePayerStatus({ ...payer, hasPayed: e })
                        getBudget(card.travelId)
                     }}
                  />
               }
            />
         </div>
      ))
   }

   setCostFormat = (number) => {
      if (number) {
         return number
            .toString()
            .split(' ')
            .join('')
            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      }
      return '0'
   }

   splitGeneralCost = () => {
      const {
         card: { payers, cost },
         userId,
      } = this.props

      const personalCost = this.setCostFormat(parseInt(cost / payers.length))
      return payers.map((payer) => (
         <span
            key={payer._id}
            children={personalCost + ' P'}
            className={classNames(
               styles.card__cost_personal,
               payer.user._id === userId && styles.card__cost_myCost,
               payer.user._id === userId &&
                  payer.hasPayed &&
                  styles.card__cost_myCostPayed
            )}
         />
      ))
   }

   componentDidMount() {
      this.setState({
         cost: this.props.card.cost,
         comment: this.props.card.comment,
      })
   }

   render() {
      const { toClose, deleteCard, card, getBudget } = this.props

      const {
         _id,
         type,
         title,
         company,
         beginPoint,
         beginDate,
         endPoint,
         endDate,
         payers,
         travelId,
      } = card

      const routeDefaultCaptions = [
         {
            type: 'Транспорт',
            sectionTitle: 'Маршрут',
            company: 'Компания',
            beginPoint: 'Место отправления',
            endPoint: 'Место назначения',
         },
         {
            type,
            sectionTitle: 'Адрес',
            company: 'Название',
            beginPoint: 'Адрес не указан',
         },
      ]
      const captions = routeDefaultCaptions.find((c) => c.type === type)

      const today = new Date().toLocaleDateString()
      const start = new Date(beginDate).toLocaleDateString()
      const finish = new Date(endDate).toLocaleDateString()
      const unexpiredCard = new Date(endDate) > new Date()

      return (
         <ModalBase toClose={toClose}>
            <div className={styles.card}>
               <div className={styles.card__header}>
                  <span className={styles.card__breadcrumbs}>
                     {type} / <strong>{title}</strong>
                  </span>
                  <CloseIcon
                     className={classNames(styles.icons, styles.icons__close)}
                     onClick={toClose}
                  />
               </div>

               <div className={styles.card__leftSide}>
                  <section className={styles.card__route}>
                     <div className={styles.section__title}>
                        <h2>{captions.sectionTitle}</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={() => this.openForm('CardForm')}
                        />
                     </div>

                     <span
                        className={classNames(
                           styles.card__companyName,
                           !company && styles.defaultCaptions
                        )}
                        children={company || captions.company}
                     />

                     <div className={styles.schema}>
                        {captions.beginPoint && (
                           <div
                              className={classNames(
                                 styles.schema__point,
                                 start === today &&
                                    unexpiredCard &&
                                    styles.schema__point_currentDate
                              )}
                           />
                        )}
                        {captions.endPoint && (
                           <>
                              <div
                                 className={classNames(
                                    styles.schema__path,
                                    finish === today &&
                                       unexpiredCard &&
                                       styles.schema__path_currentDate
                                 )}
                              />
                              <div
                                 className={classNames(
                                    styles.schema__point,
                                    finish === today &&
                                       unexpiredCard &&
                                       styles.schema__point_currentDate
                                 )}
                              />
                           </>
                        )}
                     </div>

                     <div className={styles.route}>
                        <div className={styles.route__start}>
                           <span
                              className={classNames(
                                 styles.route__place,
                                 !beginPoint && styles.defaultCaptions
                              )}
                              children={beginPoint || captions.beginPoint}
                           />

                           <span
                              className={classNames(
                                 styles.route__date,
                                 start === today &&
                                    unexpiredCard &&
                                    styles.route__date_currentDate
                              )}
                              children={this.convertDate(beginDate)}
                           />
                        </div>
                        <div className={styles.route__finish}>
                           <span
                              className={classNames(
                                 styles.route__place,
                                 !endPoint && styles.defaultCaptions
                              )}
                              children={endPoint || captions.endPoint}
                           />
                           <span
                              className={classNames(
                                 styles.route__date,
                                 finish === today &&
                                    unexpiredCard &&
                                    styles.route__date_currentDate
                              )}
                              children={this.convertDate(endDate)}
                           />
                        </div>
                     </div>
                  </section>

                  <section className={styles.card__docs}>
                     <div className={styles.section__title}>
                        <h2>Документы</h2>
                        <AddIcon
                           className={styles.icons}
                           onClick={() => this.filesInput.current.click()}
                        />
                        <input
                           style={{ display: 'none' }}
                           type="file"
                           ref={this.filesInput}
                           onChange={this.uploadFileHandler}
                        />
                     </div>
                     {this.filesToRender()}
                  </section>

                  <section className={styles.card__comments}>
                     <div className={styles.section__title}>
                        <h2>Комментарии</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={() =>
                              this.focusInput(this.commentInput.current)
                           }
                        />
                     </div>
                     <textarea
                        name="comment"
                        value={this.state.comment}
                        ref={this.commentInput}
                        onChange={this.handleChange}
                        onBlur={(e) =>
                           this.updateCard(e.target.name, e.target.value)
                        }
                     />
                  </section>
               </div>

               <div className={styles.card__rightSide}>
                  <section className={styles.card__travelers}>
                     <div className={styles.section__title}>
                        <h2>Участники</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={(e) => {
                              this.setState({
                                 userPickerPosition: this.setPosition(
                                    e.clientX - 140,
                                    e.clientY + 20
                                 ),
                              })
                              this.openForm('UserPicker')
                           }}
                        />
                     </div>
                     {payers.length > 0 && (
                        <div className={styles.travelers__columns}>
                           <span
                              className={styles.travelers__columnTitle}
                              children="заплатил за всех"
                           />
                           <span
                              className={styles.travelers__columnTitle}
                              children="заплатил за себя"
                           />
                        </div>
                     )}

                     {this.payersToRender()}
                  </section>

                  <section className={styles.card__cost}>
                     <div className={styles.section__title}>
                        <h2>Стоимость</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={() =>
                              this.focusInput(this.costInput.current)
                           }
                        />
                     </div>
                     <span className={styles.card__cost_general}>
                        <input
                           name="cost"
                           type="text"
                           value={this.setCostFormat(this.state.cost)}
                           ref={this.costInput}
                           onChange={this.handleChange}
                           onKeyDown={this.handleChange}
                           onBlur={(e) => {
                              this.updateCard(
                                 e.target.name,
                                 +e.target.value.split(' ').join('')
                              )
                              getBudget(travelId)
                           }}
                        />
                        {' Р'}
                     </span>
                     {this.splitGeneralCost()}
                  </section>

                  <div className={styles.card__actions}>
                     <Button
                        onClick={() => {
                           if (window.confirm('Вы подтверждаете удаление?')) {
                              deleteCard(_id)
                           }
                           toClose()
                        }}
                        text="Удалить карточку"
                        type="delete"
                     />
                     <Button onClick={toClose} text="OK" ml={20} />
                  </div>
               </div>
            </div>

            {this.state.isCardFormOpen && (
               <CardFormContainer
                  onClose={() => this.closeForm('CardForm')}
                  card={card}
               />
            )}

            {this.state.isUserPickerOpen && (
               <UserPicker
                  onClose={() => this.closeForm('UserPicker')}
                  position={this.state.userPickerPosition}
                  payers={payers}
                  cardId={card._id}
                  type={'card'}
               />
            )}
         </ModalBase>
      )
   }
}

const mapStateToProps = ({ userReducer }) => ({
   userId: userReducer.user._id,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         changeCard,
         deleteCard,
         uploadFile,
         deleteFile,
         changePayerStatus,
         getBudget,
      },
      dispatch
   )

export default connect(mapStateToProps, mapDispatchToProps)(CardFull)
