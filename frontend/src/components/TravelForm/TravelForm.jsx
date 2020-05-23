import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './TravelForm.module.scss'

import ModalBase from '../../controls/ModalBase/ModalBase'
import Button from '../../controls/Button/Button'
import { ReactComponent as CrossIcon } from '../../assets/images/icons/cross.svg'
import MultiSelect from 'react-multi-select-component'

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
      const users = this.state.selected.map((o) => ({
         ...o,
      }))
      this.props.onSubmit({ ...this.state, users })
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
      const { onClose, onSubmit } = this.props
      const { title, beginDate, endDate } = this.state
      const prop = {
         selectSomeItems: 'Пригласите друзей в поездку',
         allItemsAreSelected: 'Приглашены все друзья',
         selectAll: 'safdt All',
         search: 'Seasdsrch',
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
                     value={beginDate}
                     onChange={this.handleChange}
                  />
                  <Input
                     label="Окончание"
                     type="date"
                     name="endDate"
                     value={endDate}
                     onChange={this.handleChange}
                  />
               </div>
               <div className={styles.form__inputs}>
                  <div className={styles.input__block}>
                     <label
                        className={styles.label}
                        htmlFor="users"
                        children="Участники"
                     />
                     <label
                        className={`${styles.label} ${styles.input__block_hint}`}
                        children="можно добавить позже"
                     />
                     <MultiSelect
                        className={styles.multiSelect}
                        options={this.state.options}
                        value={this.state.selected}
                        selectAllLabel="Выбрать всех"
                        onChange={this.setSelected}
                        labelledBy={'Select'}
                        disableSearch="true"
                        overrideStrings={prop}
                     />
                  </div>
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
