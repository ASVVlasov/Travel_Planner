import React from 'react'
import PropTypes from 'prop-types'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'

import styles from './Header.module.scss'
import { ReactComponent as BackBtnSVG } from '../../assets/images/icons/arrow.svg'
import { ReactComponent as EditBtnSVG } from '../../assets/images/icons/pencil.svg'
import { ReactComponent as HeaderMenuSVG } from '../../assets/images/icons/menu.svg'

import HeaderTitle from '../../controls/HeaderTitle/HeaderTitle'
import Calendar from '../../controls/Calendar/Calendar'
import UserPicker from '../../controls/UserPicker/UserPicker'

class Header extends React.Component {
   static propTypes = {
      travel: PropTypes.object.isRequired,
   }
   constructor(props) {
      super(props)
      this.state = {
         isUserPickerOpen: false,
         isHeaderMenuOpen: false,
         userPickerPosition: {},
      }
   }

   //TODO remove
   FILE_URL = 'http://localhost:3300/card/file/'

   showHeaderMenu = () => {
      this.setState({
         isHeaderMenuOpen: !this.state.isHeaderMenuOpen,
      })
   }

   openForm = (formName) => {
      this.setState({ [`is${formName}Open`]: true })
   }

   closeForm = (formName) => {
      this.setState({ [`is${formName}Open`]: false })
   }

   setPosition = (x, y) => {
      return {
         position: 'absolute',
         top: y + 'px',
         left: x + 'px',
      }
   }
   archiveTrip = () => {
      //add functionality
      this.showHeaderMenu()
   }
   deleteTrip = () => {
      //add functionality
      this.showHeaderMenu()
   }

   mapUsersToRender = () => {
      const { users } = this.props.travel
      let usersArray = []

      if (users) {
         users.map((user) =>
            usersArray.push(
               <div className={styles.travellers__item} key={user._id}>
                  {!user.avatar && user.nickName[0].toUpperCase()}
                  {user.avatar && (
                     <img
                        src={this.FILE_URL + user.avatar}
                        alt={user.nickName}
                     />
                  )}
               </div>
            )
         )
      }
      return usersArray
   }

   render() {
      const mainUser = this.props.user
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
               <button
                  className={styles.travellers__button}
                  children={'+'}
                  onClick={(e) => {
                     this.setState({
                        userPickerPosition: this.setPosition(
                           e.clientX - 195,
                           e.clientY + 30
                        ),
                     })
                     this.openForm('UserPicker')
                  }}
               ></button>

               {this.state.isUserPickerOpen && (
                  <UserPicker
                     onClose={() => this.closeForm('UserPicker')}
                     position={this.state.userPickerPosition}
                     type={'travel'}
                  />
               )}

               {this.mapUsersToRender()}

               <div className={styles.travellers__item_mainUser}>
                  {!mainUser.avatar && mainUser.nickName[0].toUpperCase()}
                  {mainUser.avatar && (
                     <img
                        src={this.FILE_URL + mainUser.avatar}
                        alt={mainUser.nickName}
                     />
                  )}
               </div>
            </div>
            <div className={styles.headerMenu}>
               <div className={styles.headerMenu__burger}>
                  <HeaderMenuSVG onClick={this.showHeaderMenu} />
               </div>

               {this.state.isHeaderMenuOpen && (
                  <div className={styles.headerMenu__ul}>
                     <button
                        className={styles.headerMenu__archiveTrip}
                        onClick={this.archiveTrip}
                     >
                        Перенести в архив
                     </button>
                     <div className={styles.headerMenu__line}></div>
                     <button
                        className={styles.headerMenu__deleteTrip}
                        onClick={this.deleteTrip}
                     >
                        Удалить поездку
                     </button>
                  </div>
               )}
            </div>
         </header>
      )
   }
}

const mapStateToProps = ({ travelReducer, userReducer }) => ({
   travel: travelReducer.travel,
   user: userReducer,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
