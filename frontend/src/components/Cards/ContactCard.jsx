import React, { Component } from 'react'
import styles from './ContactCard.module.scss'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteContact } from '../../redux/user/operations'

import { ReactComponent as UserRemoveIcon } from '../../assets/images/icons/cross.svg'

class ContactCard extends Component {
   static propTypes = {
      contact: PropTypes.object.isRequired,
      deleteContact: PropTypes.func.isRequired,
   }

   //TODO remove
   AVATAR_URL = window.location.port
      ? 'http://localhost:3300/user/avatar/'
      : window.location.origin + '/user/avatar/'

   render() {
      const { _id, avatar, nickName, surname, name, email } = this.props.contact

      const fullName = name || surname ? `${name} ${surname}` : null

      return (
         <div className={styles.card}>
            <UserRemoveIcon
               className={styles.icon}
               title="Удалить из контактов"
               onClick={() => this.props.deleteContact({ userId: _id })}
            />

            <h2
               className={styles.contact__name}
               children={fullName || nickName}
            />

            <div className={styles.contact__additional}>
               {fullName && (
                  <span
                     className={styles.contact__nickName}
                     children={nickName}
                  />
               )}
               <a
                  className={styles.contact__email}
                  href={`mailto:${email}`}
                  children={email}
               />
            </div>

            <div className={styles.contact__avatar}>
               {!avatar && nickName[0]}
               {avatar && <img src={this.AVATAR_URL + avatar} alt="" />}
            </div>
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ deleteContact }, dispatch)
export default connect(null, mapDispatchToProps)(ContactCard)
