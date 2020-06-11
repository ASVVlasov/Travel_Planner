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

   getUserName = (user, isAvatarName = false) => {
      const { nickName, surname, name } = user
      if (isAvatarName) {
         return name && surname ? name[0] + surname[0] : nickName[0]
      }
      return name || surname ? `${name} ${surname}`.trim() : nickName
   }

   render() {
      const { _id, avatar, nickName, surname, name, email } = this.props.contact
      const fullName = name || surname

      return (
         <div className={styles.card}>
            <UserRemoveIcon
               className={styles.icon}
               title="Удалить из контактов"
               onClick={() => this.props.deleteContact({ userId: _id })}
            />

            <h2
               className={styles.contact__name}
               children={this.getUserName(this.props.contact)}
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
               {!avatar && this.getUserName(this.props.contact, true)}
               {avatar && (
                  <img
                     src={this.AVATAR_URL + avatar}
                     alt={this.getUserName(this.props.contact)}
                  />
               )}
            </div>
         </div>
      )
   }
}

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ deleteContact }, dispatch)
export default connect(null, mapDispatchToProps)(ContactCard)
