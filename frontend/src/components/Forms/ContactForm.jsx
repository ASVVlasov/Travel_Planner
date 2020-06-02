import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ContactForm.module.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
   searchContact,
   addContact,
   deleteContact,
} from '../../redux/user/operations'
import { clearContactSearch } from '../../redux/user/actions'

import ModalBase from '../../controls/ModalBase/ModalBase'
import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import { ReactComponent as SearchIcon } from '../../assets/images/icons/search.svg'
import InputControl from '../../controls/Input/InputControl'
import Button from '../../controls/Button/Button'

class ContactForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      searchContact: PropTypes.func,
      addContact: PropTypes.func,
      deleteContact: PropTypes.func,
      clearContactSearch: PropTypes.func,
      contacts: PropTypes.arrayOf(PropTypes.object),
      newContacts: PropTypes.arrayOf(PropTypes.object),
      reqError: PropTypes.string,
   }

   state = {
      search: '',
   }

   handleChange = (e) =>
      this.setState({ [e.target.name]: e.target.value.toLowerCase() })

   handleKeyUp = (e) => {
      if (e.keyCode === 13) {
         this.searchContact()
      }
   }

   searchContact = () => this.props.searchContact({ email: this.state.search })

   mapContactsToRender = (newContacts, contacts) =>
      newContacts.map((nc) => (
         <div className={styles.result} key={nc._id}>
            <span
               className={styles.result__user}
               children={`${nc.nickName} (${nc.email})`}
            />
            {contacts.find((c) => c._id === nc._id) ? (
               <button
                  className={styles.result__button}
                  children="удалить"
                  name="delete"
                  onClick={() => this.props.deleteContact({ userId: nc._id })}
               />
            ) : (
               <button
                  className={styles.result__button}
                  children="добавить"
                  onClick={() => this.props.addContact({ userId: nc._id })}
               />
            )}
         </div>
      ))

   clear = () => {
      this.props.clearContactSearch()
      this.setState({ search: '' })
   }

   componentWillUnmount() {
      if (this.props.reqError) {
         this.props.clearContactSearch()
      }
   }

   render() {
      const { onClose, contacts, newContacts, reqError } = this.props

      return (
         <ModalBase toClose={onClose}>
            <div className={styles.form}>
               <span
                  className={styles.form__title}
                  children="Поиск контактов"
               />
               <CloseIcon
                  className={`${styles.icon} ${styles.icon__close}`}
                  onClick={onClose}
               />

               <div className={styles.form__inputs}>
                  <InputControl
                     type="text"
                     placeholder={'Введите e-mail друга'}
                     name="search"
                     value={this.state.search}
                     onChange={this.handleChange}
                     onKeyUp={this.handleKeyUp}
                  />
                  <SearchIcon
                     className={`${styles.icon} ${styles.icon__search}`}
                     onClick={this.searchContact}
                  />
               </div>

               {reqError && (
                  <div className={`${styles.result} ${styles.result_wrong}`}>
                     <span
                        className={styles.result__error}
                        children={reqError}
                     />
                     {reqError.includes('не найден') && (
                        <p className={styles.result__description}>
                           Проверьте правильность введенного адреса.
                           <br />
                           Если все верно, возможно друг еще не пользуется
                           сервисом &mdash; поделитесь с ним нашей ссылкой
                        </p>
                     )}
                  </div>
               )}

               {newContacts && this.mapContactsToRender(newContacts, contacts)}

               <div className={styles.form__actions}>
                  <Button text="Очистить" kind="cancel" onClick={this.clear} />
               </div>
            </div>
         </ModalBase>
      )
   }
}

const mapStateToProps = ({ userReducer }) => ({
   contacts: userReducer.user.contacts,
   newContacts: userReducer.newContacts,
   reqError: userReducer.reqError,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      { searchContact, addContact, deleteContact, clearContactSearch },
      dispatch
   )

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
