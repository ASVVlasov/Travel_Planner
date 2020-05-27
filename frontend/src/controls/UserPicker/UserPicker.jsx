import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './UserPicker.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addPayer, deletePayer } from '../../redux/cards/operations'
import {
   addTraveler,
   deleteTraveler,
   getBudget,
} from '../../redux/travel/operations'

import ModalBase from '../ModalBase/ModalBase'
import { ReactComponent as AddIcon } from '../../assets/images/icons/plus.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/icons/cross.svg'

class UserPicker extends Component {
   static propTypes = {
      type: PropTypes.oneOf(['card', 'travel']),
      onClose: PropTypes.func.isRequired,
      addPayer: PropTypes.func.isRequired,
      deletePayer: PropTypes.func.isRequired,
      getBudget: PropTypes.func,
      position: PropTypes.object,
      contacts: PropTypes.arrayOf(PropTypes.object),
      users: PropTypes.arrayOf(PropTypes.object),
      payers: PropTypes.arrayOf(PropTypes.object),
      cardId: PropTypes.string,
      travelId: PropTypes.string,
      addTraveler: PropTypes.func.isRequired,
      deleteTraveler: PropTypes.func.isRequired,
   }

   //TODO remove
   FILE_URL = window.location.port
      ? 'http://localhost:3300/card/file/'
      : window.location.origin + '/card/file/'

   addUserHandler = (userId) => {
      const {
         type,
         cardId,
         travelId,
         addPayer,
         getBudget,
         addTraveler,
      } = this.props
      if (type === 'card') {
         addPayer({ cardId, userId })
         getBudget(travelId)
      } else {
         addTraveler({ travelId, userId })
      }
   }

   deleteUserHandler = (userId) => {
      const {
         type,
         cardId,
         travelId,
         deletePayer,
         getBudget,
         deleteTraveler,
      } = this.props
      if (type === 'card') {
         deletePayer({ cardId, userId })
         getBudget(travelId)
      } else {
         deleteTraveler({ travelId, userId })
      }
   }

   render() {
      const { type, onClose, position, contacts, users, payers } = this.props

      const allUsers = type === 'card' ? users : contacts
      const chosenUsers =
         type === 'card' ? payers.map((payer) => payer.user) : users
      return (
         <ModalBase toClose={onClose}>
            <div className={styles.picker} style={position}>
               {allUsers.map((user) => (
                  <div className={styles.user} key={user._id}>
                     <div className={styles.user__avatar}>
                        {!user.avatar && user.nickName[0]}
                        {user.avatar && (
                           <img
                              src={this.FILE_URL + user.avatar}
                              alt={user.nickName}
                              title={user.nickName}
                           />
                        )}
                        {chosenUsers.findIndex(
                           (cUser) => cUser._id === user._id
                        ) >= 0 ? (
                           <DeleteIcon
                              className={`${styles.icons} ${styles.icons__delete}`}
                              onClick={() => this.deleteUserHandler(user._id)}
                           />
                        ) : (
                           <AddIcon
                              className={`${styles.icons} ${styles.icons__add}`}
                              onClick={() => this.addUserHandler(user._id)}
                           />
                        )}
                     </div>
                     <span
                        className={styles.user__name}
                        title={user.nickName}
                        children={user.nickName}
                     />
                  </div>
               ))}
            </div>
         </ModalBase>
      )
   }
}

const mapStateToProps = ({ travelReducer, userReducer }) => ({
   travelId: travelReducer.travel._id,
   users: travelReducer.travel.users,
   contacts: userReducer.contacts,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators(
      {
         addPayer,
         deletePayer,
         addTraveler,
         deleteTraveler,
         getBudget,
      },
      dispatch
   )

export default connect(mapStateToProps, mapDispatchToProps)(UserPicker)
