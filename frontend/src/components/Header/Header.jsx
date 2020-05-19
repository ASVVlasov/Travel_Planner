import React from 'react'
import PropTypes from 'prop-types'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { getTravel } from '../../redux/travel/operations'

import styles from './Header.module.scss'
import { ReactComponent as BackBtnSVG } from '../../assets/images/icons/arrow.svg'
import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as UserProfileSVG } from '../../assets/images/icons/avatar.svg'

import HeaderTitle from '../../controls/HeaderTitle/HeaderTitle'
import Calendar from '../../controls/Calendar/Calendar'

class Header extends React.Component {
   static propTypes = {
      travel: PropTypes.object.isRequired,
      getTravel: PropTypes.func.isRequired,
   }
   constructor(props) {
      super(props)
      this.state = {}
   }

   componentDidMount() {
      const travelId = '5ec2628732d87634b0b0063b'
      this.props.getTravel(travelId) //action
   }

   mapUsersToRender = () => {
      const { users } = this.props.travel

      if (users) {
         return users.map((user) => (
            <div className={styles['travellers-item']} key={user._id}>
               {user.nickName.charAt(0)}
            </div>
         ))
      }
   }

   render() {
      return (
         <header className={styles.header}>
            <div className={styles['back-btn']}>
               <BackBtnSVG />
            </div>
            <div className={styles['trip-data']}>
               <div className={styles['trip-data__item']}>
                  <div className={styles['trip-data__title-text']}>
                     <HeaderTitle />
                  </div>
               </div>
               <div className={styles['trip-data__item']}>
                  <div className={styles['trip-data__period-text']}>
                     <Calendar />
                  </div>
                  <EditBtnSVG className={styles['trip-data__edit-btn']} />
               </div>
            </div>

            <div className={styles['travellers']}>
               {this.mapUsersToRender()}
            </div>
            <div className={styles['user-profile']}>
               <UserProfileSVG />
            </div>
         </header>
      )
   }
}

const mapStateToProps = ({ travelReducer }) => ({
   travel: travelReducer.travel,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getTravel }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
