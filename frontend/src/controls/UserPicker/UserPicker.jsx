import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './UserPicker.module.scss'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addPayer, deletePayer } from '../../redux/cards/operations'
import { getBudget } from '../../redux/travel/operations'

import ModalBase from '../ModalBase/ModalBase'
import { ReactComponent as AddIcon } from '../../assets/images/icons/plus.svg'
import { ReactComponent as DeleteIcon } from '../../assets/images/icons/cross.svg'

class UserPicker extends Component {
   static propTypes = {
      onClose: PropTypes.func.isRequired,
      addPayer: PropTypes.func.isRequired,
      deletePayer: PropTypes.func.isRequired,
      getBudget: PropTypes.func,
      position: PropTypes.object,
      users: PropTypes.arrayOf(PropTypes.object),
      payers: PropTypes.arrayOf(PropTypes.object),
      cardId: PropTypes.string,
      travelId: PropTypes.string,
   }

   //TODO remove
   FILE_URL = window.location.port
      ? 'http://localhost:3300/card/file/'
      : window.location.origin + '/card/file/'

   render() {
      const {
         onClose,
         addPayer,
         deletePayer,
         getBudget,
         position,
         users,
         payers,
         cardId,
         travelId,
      } = this.props

      return (
         <ModalBase toClose={onClose}>
            <div className={styles.picker} style={position}>
               {users.map((user) => (
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
                        {payers.findIndex((p) => p.user._id === user._id) >=
                        0 ? (
                           <DeleteIcon
                              className={`${styles.icons} ${styles.icons__delete}`}
                              onClick={() => {
                                 deletePayer({ cardId, userId: user._id })
                                 getBudget(travelId)
                              }}
                           />
                        ) : (
                           <AddIcon
                              className={`${styles.icons} ${styles.icons__add}`}
                              onClick={() => {
                                 addPayer({ cardId, userId: user._id })
                                 getBudget(travelId)
                              }}
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

const mapStateToProps = ({ travelReducer }) => ({
   travelId: travelReducer.travel._id,
   users: travelReducer.travel.users,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ addPayer, deletePayer, getBudget }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserPicker)
