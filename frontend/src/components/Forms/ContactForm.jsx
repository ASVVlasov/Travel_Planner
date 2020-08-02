import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ContactForm.module.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
   searchContact,
   inviteСontact,
   addContact,
   deleteContact,
} from '../../redux/user/operations'
import { clearContactSearch, clearErrorSearch } from '../../redux/user/actions'

import ModalBase from '../../controls/ModalBase/ModalBase'
import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import { ReactComponent as SearchIcon } from '../../assets/images/icons/search.svg'
import InputControl from '../../controls/Input/InputControl'
import Button from '../../controls/Button/Button'
import Alert from '../../controls/Alert/Alert'

class ContactForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      searchContact: PropTypes.func,
      inviteСontact: PropTypes.func,
      addContact: PropTypes.func,
      deleteContact: PropTypes.func,
      clearContactSearch: PropTypes.func,
      contacts: PropTypes.arrayOf(PropTypes.object),
      newContacts: PropTypes.arrayOf(PropTypes.object),
      searchError: PropTypes.object,
      inviteAlert: PropTypes.object,
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

   inviteСontact = () => this.props.inviteСontact({ email: this.state.search })

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

   mapInviteContactToRender = () => (
      <div className={styles.result}>
         <span className={styles.result__user} children={this.state.search} />
         {this.state.search && (
            <button
               className={styles.result__button}
               children="пригласить"
               onClick={this.inviteСontact}
            />
         )}
      </div>
   )

   clear = () => {
      this.props.clearContactSearch()
      this.props.clearErrorSearch()
      this.setState({ search: '' })
   }

   componentWillUnmount() {
      this.props.clearErrorSearch()
   }

   render() {
      const {
         onClose,
         contacts,
         newContacts,
         searchError,
         inviteAlert,
      } = this.props

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

               {searchError && (
                  <div className={`${styles.result} ${styles.result_wrong}`}>
                     <span
                        className={styles.result__error}
                        children={searchError.message}
                     />
                     {searchError.message.includes('не найден') && (
                        <div>
                           <p className={styles.result__description}>
                              Проверьте правильность введенного адреса.
                              <br />
                              Если все верно, возможно друг еще не пользуется
                              сервисом &mdash; отправьте ему приглашение на
                              почту
                           </p>
                           {this.mapInviteContactToRender()}
                        </div>
                     )}
                  </div>
               )}

               {newContacts && this.mapContactsToRender(newContacts, contacts)}

               <div className={styles.form__actions}>
                  <Button text="Очистить" type="cancel" onClick={this.clear} />
               </div>
            </div>

            {inviteAlert && (
               <Alert {...inviteAlert} errName="contactInviteAlert" />
            )}
         </ModalBase>
      )
   }
}

const mapStateToProps = ({ userReducer, fetchReducer }) => ({
   contacts: userReducer.user.contacts,
   newContacts: userReducer.newContacts,
   searchError: fetchReducer.contactSearchError,
   inviteAlert: fetchReducer.contactInviteAlert,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         searchContact,
         inviteСontact,
         addContact,
         deleteContact,
         clearContactSearch,
         clearErrorSearch,
      },
      dispatch
   )

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
