import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './CardFull.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeCard, deleteCard } from '../../redux/cards/operations'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import Switch from '../../controls/Switch/Switch'
import CardFormContainer from '../../containers/CardFormContainer'

import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import { ReactComponent as EditIcon } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as AddIcon } from '../../assets/images/icons/plus.svg'

class CardFull extends Component {
   static propTypes = {
      toClose: PropTypes.func.isRequired,
      changeCard: PropTypes.func.isRequired,
      deleteCard: PropTypes.func.isRequired,
      card: PropTypes.object.isRequired,
   }

   state = {
      comment: '',
      cost: 0,
      isCardFormOpen: false,
   }

   openForm = () => {
      this.setState({ isCardFormOpen: true })
   }

   closeForm = () => {
      this.setState({ isCardFormOpen: false })
   }

   textArea = createRef()

   focusTextArea = () => {
      const el = this.textArea.current
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
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
         <a
            download
            href={file.uploadName}
            children={file.originalName}
            key={file._id}
         />
         //TODO add remove option
      ))
   }

   usersToRender = () => {
      return this.props.card.users.map((user) => (
         <div className={styles.travelers__person} key={user._id}>
            <div className={styles.travelers__avatar}>
               {/* <img src={ user.avatar } alt={ user.nickName } title={ user.nickName } /> */}
            </div>
            <span className={styles.travelers__name} children={user.nickName} />
            {/* TODO add logic for switches */}
            <div className={styles.travelers__switch} children={<Switch />} />
            <div
               className={classNames(
                  styles.travelers__switch,
                  user._id !== 'currentUser._id' && styles.hidden //TODO replace string with props
               )}
               children={<Switch />}
            />
         </div>
      ))
   }

   splitGeneralCost = () => {
      const { users, cost } = this.props.card
      return users.map((user) => (
         // TODO add formatting for cost
         <span
            key={user._id}
            className={styles.card__cost_personal}
            children={`${cost / users.length} Р`}
         />
      ))
   }

   render() {
      const { toClose, deleteCard, card } = this.props

      const {
         _id,
         type,
         title,
         company,
         beginPoint,
         beginDate,
         endPoint,
         endDate,
         comment,
         cost,
      } = this.props.card

      const routeSectionTitle = type === 'Транспорт' ? 'Маршрут' : 'Адрес'

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
                        <h2>{routeSectionTitle}</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={this.openForm}
                        />
                     </div>

                     <span
                        className={styles.card__companyName}
                        children={company}
                     />

                     <div className={styles.schema}>
                        {beginPoint && <div className={styles.schema__point} />}
                        {endPoint && (
                           <>
                              <div className={styles.schema__path} />
                              <div className={styles.schema__point} />
                           </>
                        )}
                     </div>

                     <div className={styles.route}>
                        <div className={styles.route__start}>
                           <span
                              className={styles.route__place}
                              children={beginPoint}
                           />
                           <span
                              className={styles.route__date}
                              children={this.convertDate(beginDate)}
                           />
                        </div>
                        <div className={styles.route__finish}>
                           <span
                              className={styles.route__place}
                              children={endPoint}
                           />
                           <span
                              className={styles.route__date}
                              children={this.convertDate(endDate)}
                           />
                        </div>
                     </div>
                  </section>

                  <section className={styles.card__docs}>
                     <div className={styles.section__title}>
                        <h2>Документы</h2>
                        {/* TODO add onClick with files loader */}
                        <AddIcon className={styles.icons} />
                     </div>
                     {this.filesToRender()}
                  </section>

                  <section className={styles.card__comments}>
                     <div className={styles.section__title}>
                        <h2>Комментарии</h2>
                        <EditIcon
                           className={styles.icons}
                           onClick={this.focusTextArea}
                        />
                     </div>
                     <textarea
                        name="comment"
                        value={this.state.comment || comment}
                        ref={this.textArea}
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) =>
                           this.updateCard(e.target.name, e.target.value)
                        }
                     />
                  </section>
               </div>

               <div className={styles.card__rightSide}>
                  <section className={styles.card__travelers}>
                     <h2>Участники</h2>

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

                     {this.usersToRender()}

                     {/* TODO add function for choosing additional contacts*/}
                     <div
                        className={classNames(
                           styles.travelers__person,
                           styles.travelers__person_add
                        )}
                        key={100}
                     >
                        <div
                           className={classNames(
                              styles.travelers__avatar,
                              styles.travelers__avatar_add
                           )}
                        />
                        <span
                           className={classNames(
                              styles.travelers__name,
                              styles.travelers__name_add
                           )}
                           children={'добавить'}
                        />
                     </div>
                  </section>

                  <section className={styles.card__cost}>
                     <h2>Стоимость</h2>
                     {/* TODO add formatting for cost */}
                     <span className={styles.card__cost_general}>
                        <input
                           name="cost"
                           type="number"
                           value={this.state.cost || cost}
                           onChange={(e) => this.handleChange(e)}
                           onBlur={(e) =>
                              this.updateCard(e.target.name, e.target.value)
                           }
                        />
                        {' Р'}
                     </span>
                     {this.splitGeneralCost()}
                  </section>

                  <div className={styles.card__actions}>
                     <Button
                        onClick={() => {
                           deleteCard(_id)
                           toClose()
                        }}
                        text="Удалить карточку"
                        kind="cancel"
                     />
                     <Button onClick={toClose} text="OK" />
                  </div>
               </div>
            </div>

            {this.state.isCardFormOpen && (
               <CardFormContainer onClose={this.closeForm} card={card} />
            )}
         </ModalBase>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ changeCard, deleteCard }, dispatch)

export default connect(null, mapDispatchToProps)(CardFull)
