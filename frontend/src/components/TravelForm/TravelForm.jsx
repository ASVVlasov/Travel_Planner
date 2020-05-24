import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './TravelForm.module.scss'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import { ReactComponent as CrossIcon } from '../../assets/images/icons/cross.svg'
import { Input } from '../../controls/Input/Input'

export default class TravelForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      users: PropTypes.array.isRequired,
   }

   state = {
      title: '',
      beginDate: new Date().toISOString().split('.')[0],
      endDate: new Date().toISOString().split('.')[0],
      options: [],
      selected: [],
   }

   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }

   setSelected = (selected) => {
      this.setState({ selected })
   }

   submit = () => {
      const refactor = ({ options, selected, ...obj }) => ({
         ...obj,
         users: selected,
      })
      this.props.onSubmit(refactor(this.state))
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
                  <Input
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
                  <Input
                     label="Начало"
                     type="date"
                     name="beginDate"
                     styles={styles.input_beginDate}
                     value={beginDate}
                     onChange={this.handleChange}
                  />
                  <Input
                     label="Окончание"
                     type="date"
                     name="endDate"
                     styles={styles.input_endDate}
                     value={endDate}
                     onChange={this.handleChange}
                  />
               </div>
               <div className={styles.form__inputs}>
                  <Input
                     label="Участники"
                     type="multiselect"
                     name="users"
                     styles={styles.input_users}
                     hintLabel="можно добавить позже"
                     options={this.state.options}
                     value={this.state.selected}
                     onChange={this.setSelected}
                     disableSearch="true"
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
