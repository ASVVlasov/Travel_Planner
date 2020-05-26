import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './TravelForm.module.scss'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import { ReactComponent as CrossIcon } from '../../assets/images/icons/cross.svg'
import InputControl from '../../controls/Input/InputControl'

export default class TravelForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      users: PropTypes.array.isRequired,
   }

   state = {
      title: '',
      beginDate: new Date(),
      endDate: new Date(),
      options: [],
      users: [],
   }

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   submit = () => {
      this.props.onSubmit(this.state)
   }

   componentDidMount() {
      this.setState({
         options: this.props.users.map((u) => ({
            ...u,
            label: u.nickName,
            value: u._id,
         })),
      })
   }

   render() {
      console.log(this.state)
      const { onClose } = this.props
      const { title, beginDate, endDate } = this.state
      const overrideStrings = {
         selectSomeItems: 'Пригласите друзей в поездку',
         allItemsAreSelected: 'Приглашены все друзья',
      }

      return (
         <ModalBase toClose={onClose}>
            <div className={styles.form}>
               <span
                  className={styles.form__title}
                  children="Создать новую поездку"
               />
               <button
                  className={styles.icon__cross}
                  onClick={onClose}
                  children={<CrossIcon />}
               />

               <div className={styles.form__inputs}>
                  <InputControl
                     label="Название поездки"
                     type="text"
                     name="title"
                     styles={styles.input_title}
                     placeholder="Евротур"
                     value={title}
                     onChange={this.handleChange}
                  />
               </div>
               <div className={styles.form__inputs}>
                  <InputControl
                     label="Начало"
                     type="date"
                     name="beginDate"
                     value={beginDate}
                     onChange={this.handleChange}
                  />
                  <InputControl
                     label="Окончание"
                     type="date"
                     name="endDate"
                     value={endDate}
                     onChange={this.handleChange}
                  />
               </div>
               <div className={styles.form__inputs}>
                  <InputControl
                     label="Участники"
                     type="multiselect"
                     name="users"
                     styles={styles.input_users}
                     hintLabel="можно добавить позже"
                     options={this.state.options}
                     value={this.state.users}
                     onChange={this.handleChange}
                     overrideStrings={overrideStrings}
                  />
               </div>

               <div className={styles.form__actions}>
                  <Button onClick={onClose} text="Отмена" kind="cancel" />
                  <Button onClick={this.submit} text="Создать" ml={20} />
               </div>
            </div>
         </ModalBase>
      )
   }
}
