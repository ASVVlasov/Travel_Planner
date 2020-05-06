import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './TransportCardFull.module.scss'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import Switch from '../../controls/Switch/Switch'

import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import { ReactComponent as EditIcon } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as AddIcon } from '../../assets/images/icons/plus.svg'

export default class TransportCardFull extends Component {
   static propTypes = {
      toClose: PropTypes.func.isRequired,
      transport: PropTypes.string,
      company: PropTypes.string,
      departurePlace: PropTypes.string,
      departureDate: PropTypes.string,
      arrivalPlace: PropTypes.string,
      arrivalDate: PropTypes.string,
      attachments: PropTypes.arrayOf(PropTypes.object),
      payer: PropTypes.string,
      travelers: PropTypes.arrayOf(PropTypes.object),
      comment: PropTypes.string,
      cost: PropTypes.number,
   }

   attachmentsToRender = () => {
      return this.props.attachments.map((attach, index) => (
         <a download href={attach.path} children={attach.name} key={index} />
         //TODO add remove option
      ))
   }

   travelersToRender = () => {
      return this.props.travelers.map((traveler, index) => (
         <div className={styles.travelers__person} key={index}>
            <div className={styles.travelers__avatar}>
               {/* <img src={ traveler.avatarPath } alt={ traveler.login } title={ traveler.login } /> */}
            </div>
            <span
               className={styles.travelers__name}
               children={traveler.login}
            />
            {/* TODO add logic for switches */}
            <div className={styles.travelers__switch} children={<Switch />} />
            <div
               className={classNames(
                  styles.travelers__switch,
                  traveler.login !== 'me' && styles.hidden
               )}
               children={<Switch />}
            />
         </div>
      ))
   }

   splitGeneralCost = () => {
      const { travelers, cost } = this.props
      return travelers.map((index) => (
         // TODO add formatting for cost
         <span
            key={index}
            className={styles.card__cost_personal}
            children={`${cost / travelers.length} Р`}
         />
      ))
   }

   render() {
      const {
         toClose,
         transport,
         company,
         departurePlace,
         departureDate,
         arrivalPlace,
         arrivalDate,
         comment,
         cost,
      } = this.props

      return (
         <ModalBase toClose={toClose}>
            <div className={styles.card}>
               <div className={styles.card__header}>
                  <span className={styles.card__breadcrumbs}>
                     Транспорт / <strong>{transport}</strong>
                  </span>
                  <CloseIcon
                     className={classNames(styles.icons, styles.icons__close)}
                     onClick={toClose}
                  />
               </div>

               <div className={styles.card__leftSide}>
                  <section className={styles.card__route}>
                     <div className={styles.section__title}>
                        <h2>Маршрут</h2>
                        {/* TODO add onClick with AddForm component */}
                        <EditIcon className={styles.icons} />
                     </div>

                     <span
                        className={styles.card__companyName}
                        children={company}
                     />

                     <div className={styles.schema}>
                        <div className={styles.schema__point} />
                        <div className={styles.schema__path} />
                        <div className={styles.schema__point} />
                     </div>

                     <div className={styles.route}>
                        <div className={styles.route__start}>
                           <span
                              className={styles.route__place}
                              children={departurePlace}
                           />
                           <span
                              className={styles.route__date}
                              children={departureDate}
                           />
                        </div>
                        <div className={styles.route__finish}>
                           <span
                              className={styles.route__place}
                              children={arrivalPlace}
                           />
                           <span
                              className={styles.route__date}
                              children={arrivalDate}
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
                     {this.attachmentsToRender()}
                  </section>

                  <section className={styles.card__comments}>
                     <div className={styles.section__title}>
                        <h2>Комментарии</h2>
                        <EditIcon className={styles.icons} />
                     </div>
                     <textarea
                        name="comments"
                        id="comments"
                        children={comment}
                        // TODO add ref and focus after click on EditIcon
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

                     {this.travelersToRender()}

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
                     <span
                        className={styles.card__cost_general}
                        children={`${cost} Р`}
                     />
                     {this.splitGeneralCost()}
                  </section>

                  <div className={styles.card__actions}>
                     <Button
                        onClick={() => {}} // TODO add delete method
                        text="Удалить карточку"
                        kind="cancel"
                     />
                     <Button onClick={toClose} text="OK" />
                  </div>
               </div>
            </div>
         </ModalBase>
      )
   }
}
