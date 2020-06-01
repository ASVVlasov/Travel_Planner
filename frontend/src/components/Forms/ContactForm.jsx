import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ContactForm.module.scss'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { searchContact, addContact } from '../../redux/user/operations'

import ModalBase from '../../controls/ModalBase/ModalBase'
import { ReactComponent as CloseIcon } from '../../assets/images/icons/cross.svg'
import { ReactComponent as SearchIcon } from '../../assets/images/icons/search.svg'
import InputControl from '../../controls/Input/InputControl'

class ContactForm extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      searchContact: PropTypes.func,
      addContact: PropTypes.func,
      contact: PropTypes.object,
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

   addNewContact = (userId) => this.props.addContact({ userId })

   render() {
      const { onClose, contact } = this.props

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

               {contact && (
                  <div className={styles.result}>
                     <span
                        className={styles.result__user}
                        children={`${contact.nickName} (${contact.email})`}
                     />
                     <button
                        className={styles.result__button}
                        children="добавить"
                        onClick={() => this.addNewContact(contact._id)}
                     />
                  </div>
               )}
            </div>
         </ModalBase>
      )
   }
}
const mapStateToProps = ({ userReducer }) => ({
   contact: userReducer.newContact,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ searchContact, addContact }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)
