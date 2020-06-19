import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

//redux
import { bindActionCreators } from 'redux'
import connect from 'react-redux/es/connect/connect'
import { changeStatusTravel, deleteTravel } from '../../redux/travel/operations'

import styles from './Header.module.scss'
import { ReactComponent as BackBtnSVG } from '../../assets/images/icons/arrow.svg'
import { ReactComponent as HeaderMenuSVG } from '../../assets/images/icons/menu.svg'

import HeaderTitle from '../../controls/HeaderTitle/HeaderTitle'
import Calendar from '../../controls/Calendar/Calendar'
import UserPicker from '../../controls/UserPicker/UserPicker'
import Button from '../../controls/Button/Button'
import Confirm from '../../controls/Confirm/Confirm'

class Header extends React.Component {
   static propTypes = {
      travel: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired,
   }
   constructor(props) {
      super(props)
      this.state = {
         isUserPickerOpen: false,
         isHeaderMenuOpen: false,
         isModalConfirmOpen: false,
         userPickerPosition: {},
      }
      document.addEventListener('click', this.handleClickOutside, false)
   }

   //TODO remove
   AVATAR_URL = window.location.port
      ? 'http://localhost:3300/user/avatar/'
      : window.location.origin + '/user/avatar/'

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

   archiveOrActivateTravel = () => {
      this.showHeaderMenu()
      const travel = { ...this.props.travel }

      if (travel.status === 'АРХИВНАЯ') {
         travel.status = 'АКТИВНАЯ'
      } else if (travel.status === 'АКТИВНАЯ') {
         travel.status = 'АРХИВНАЯ'
      }

      this.props.changeStatusTravel(travel)
   }

   deleteTrip = () => {
      this.showHeaderMenu()

      const travelId = this.props.travel._id
      this.props.deleteTravel(travelId)
   }

   mapUsersToRender = () => {
      const users = this.props.travel.users
      const mainUser = this.props.user

      if (users.length > 1) {
         return users.map((user) => {
            return (
               <div
                  className={
                     user._id === mainUser._id
                        ? styles.travellers__item_mainUser
                        : styles.travellers__item
                  }
                  title={this.getUserName(user)}
                  key={user._id}
               >
                  {!user.avatar && this.getUserName(user, true)}
                  {user.avatar && (
                     <img
                        src={this.AVATAR_URL + user.avatar}
                        alt={this.getUserName(user)}
                        title={this.getUserName(user)}
                     />
                  )}
               </div>
            )
         })
      }
   }

   componentWillUnmount = () => {
      document.removeEventListener('click', this.handleClickOutside, false)
   }

   handleClickOutside = (e) => {
      const burgerMenu = document.getElementById('headerMenuBurger')
      const path = e.path || (e.composedPath && e.composedPath())

      if (!path.includes(burgerMenu) && this.state.isHeaderMenuOpen) {
         this.setState({
            isHeaderMenuOpen: false,
         })
      }
   }
   getUserName = (user, isAvatarName = false) => {
      const { nickName, surname, name } = user
      if (isAvatarName) {
         return name
            ? surname
               ? `${name[0]}${surname[0]}`
               : name[0]
            : nickName[0]
      }
      return name || surname ? `${name} ${surname}`.trim() : nickName
   }

   render() {
      const mainUser = this.props.user
      const validTravel = !!mainUser.travels.find(
         (travel) => travel._id === this.props.travel._id
      )
      if (!validTravel) {
         return <Redirect to={'/profile/travels'} />
      }

      const users = this.props.travel.users
      const travelersAdded = users && users.length > 1
      const typeConfirm =
         this.props.travel.owner === mainUser._id
            ? 'deleteTravel'
            : 'leaveTravel'

      return (
         <header className={styles.header}>
            <Link to={'/profile/travels'}>
               <div className={styles['back-btn']}>
                  <BackBtnSVG />
               </div>
            </Link>

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
                  />
               )}

               {!travelersAdded && (
                  <Button
                     onClick={(e) => {
                        this.setPosition(e.clientX, e.clientY)
                        this.openForm('UserPicker')
                     }}
                     type="action"
                     text="Добавить участников"
                  />
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
            <div className={styles.headerMenu} id="headerMenuBurger">
               <div className={styles.headerMenu__burger}>
                  <HeaderMenuSVG onClick={this.showHeaderMenu} />
               </div>

               {this.state.isHeaderMenuOpen && (
                  <div className={styles.headerMenu__ul}>
                     <button
                        className={styles.headerMenu__archiveTrip}
                        onClick={this.archiveOrActivateTravel}
                     >
                        {this.props.travel.status === 'АКТИВНАЯ'
                           ? 'Перенести в архив'
                           : 'Вернуть из архива'}
                     </button>
                     <div className={styles.headerMenu__line}></div>
                     <button
                        className={styles.headerMenu__deleteTrip}
                        onClick={() => this.openForm('ModalConfirm')}
                     >
                        {this.props.travel.owner === mainUser._id
                           ? 'Удалить поездку'
                           : 'Покинуть поездку'}
                     </button>
                  </div>
               )}
            </div>
            {this.state.isModalConfirmOpen && (
               <Confirm
                  onClose={() => this.closeForm('ModalConfirm')}
                  act={this.deleteTrip}
                  type={typeConfirm}
               />
            )}
         </header>
      )
   }
}

const mapStateToProps = ({ travelReducer, userReducer }) => ({
   travel: travelReducer.travel,
   user: userReducer.user,
})

const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ changeStatusTravel, deleteTravel }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
