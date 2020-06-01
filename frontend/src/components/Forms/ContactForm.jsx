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

   handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

   handleKeyUp = (e) => {
      if (e.keyCode === 13) {
         this.searchContact()
      }
   }

   searchContact = () => this.props.searchContact({ email: this.state.search })

   contactToggle = async (e, userId) => {
      const button = e.target
      if (button.innerHTML === 'добавить') {
         await this.props.addContact({ userId })
         button.innerHTML = 'удалить'
         button.setAttribute('name', 'delete')
      } else {
         await this.props.deleteContact({ userId })
         button.innerHTML = 'добавить'
         button.setAttribute('name', 'add')
      }
   }

   mapContactsToRender = (newContacts, contacts) =>
      newContacts.map((nc) => {
         const buttonAttr = {}
         if (contacts.find((c) => c._id === nc._id)) {
            buttonAttr.text = 'удалить'
            buttonAttr.name = 'delete'
         } else {
            buttonAttr.text = 'добавить'
            buttonAttr.name = 'add'
         }

         return (
            <div className={styles.result} key={nc._id}>
               <span
                  className={styles.result__user}
                  children={`${nc.nickName} (${nc.email})`}
               />
               <button
                  className={styles.result__button}
                  children={buttonAttr.text}
                  name={buttonAttr.name}
                  onClick={(e) => this.contactToggle(e, nc._id)}
               />
            </div>
         )
      })

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
      const error = reqError
         ? reqError.charAt(0).toUpperCase() + reqError.slice(1)
         : null

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
                     <span className={styles.result__error} children={error} />
                     {error.includes('не найден') && (
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
