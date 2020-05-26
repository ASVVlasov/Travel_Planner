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
   FILE_URL = window.location.port
      ? 'http://localhost:3300/card/file/'
      : window.location.origin + '/card/file/'

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
      this.setState({
         userPickerPosition: {
            position: 'absolute',
            top: y + 30 + 'px',
            left: x - 195 + 'px',
         },
      })
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
      const users = this.props.travel.users
      const mainUser = this.props.user

      if (users.length > 1) {
         return users.map((user) => (
            <div
               className={
                  user._id === mainUser._id
                     ? styles.travellers__item_mainUser
                     : styles.travellers__item
               }
               key={user._id}
            >
               {!user.avatar && user.nickName[0].toUpperCase()}
               {user.avatar && (
                  <img src={this.FILE_URL + user.avatar} alt={user.nickName} />
               )}
            </div>
         ))
      }
   }

   render() {
      const users = this.props.travel.users
      let travelersAdded = false
      if (users && users.length > 1) {
         travelersAdded = true
      }
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
               {travelersAdded && (
                  <button
                     className={styles.travellers__buttonPlus}
                     children={'+'}
                     onClick={(e) => {
                        this.setPosition(e.clientX, e.clientY)
                        this.openForm('UserPicker')
                     }}
                  ></button>
               )}

               {!travelersAdded && (
                  <button
                     className={styles.travellers__addTravellersButton}
                     onClick={(e) => {
                        this.setPosition(e.clientX, e.clientY)
                        this.openForm('UserPicker')
                     }}
                  >
                     Добавить участников
                  </button>
               )}

               {this.state.isUserPickerOpen && (
                  <UserPicker
                     onClose={() => this.closeForm('UserPicker')}
                     position={this.state.userPickerPosition}
                     type={'travel'}
                  />
               )}

               {this.mapUsersToRender()}
            </div>
            <div className={styles.headerMenu}>
               <div className={styles.headerMenu__burger}>
                  <HeaderMenuSVG
                     tabIndex="1"
                     onClick={this.showHeaderMenu}
                     onBlur={this.showHeaderMenu}
                  />
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
