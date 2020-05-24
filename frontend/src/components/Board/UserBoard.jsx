import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Board.module.scss'
import { NavLink } from 'react-router-dom'

// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BoardSlider from './BoardSlider'
import Button from '../../controls/Button/Button'

import { ReactComponent as PlusIcon } from '../../assets/images/icons/plus.svg'
import TravelCard from '../Cards/TravelCard'
import ContactCard from '../Cards/ContactCard'
import TravelForm from '../TravelForm/TravelForm'

class UserBoard extends Component {
   static propTypes = {
      travels: PropTypes.arrayOf(PropTypes.object),
      contacts: PropTypes.arrayOf(PropTypes.object),
   }

   state = {
      isModalOpen: false,
      tabs: [
         {
            _id: 'travels',
            title: 'Все поездки',
         },
         {
            _id: 'contacts',
            title: 'Контакты',
         },
      ],
   }

   openModal = () => {
      this.setState({ isModalOpen: true })
   }

   closeModal = () => {
      this.setState({ isModalOpen: false })
   }

   mapTabsToRender = () =>
      this.state.tabs.map((tab) => (
         <NavLink
            exact
            to={`${tab._id}`}
            className={styles.board__tabsLink}
            activeClassName={styles.board__tabsLink_active}
            children={tab.title}
            key={tab._id}
         />
      ))

   mapCardsToRender = (tab, filter, cards) => {
      if (tab === 'travels' && !filter) {
         cards = cards.filter((card) => card.status === 'АКТИВНАЯ')
      }
      return cards.map((card) => (
         <div
            key={card._id}
            className={styles.board__card}
            children={
               tab === 'travels' ? (
                  <TravelCard travel={card} />
               ) : (
                  <ContactCard contact={card} />
               )
            }
         />
      ))
   }

   render() {
      const {
         match: {
            params: { tab },
         },
         filter,
         contacts,
      } = this.props

      return (
         <div className={styles.board}>
            <div className={styles.board__controlPanel}>
               <nav children={this.mapTabsToRender()} />
               <Button
                  onClick={this.openModal}
                  kind="action"
                  text={
                     tab === 'travels' ? 'Новая поездка' : 'Добавить контакт'
                  }
               />
            </div>

            <BoardSlider
               className={styles.board__cards}
               slides={[
                  ...this.mapCardsToRender(tab, filter, this.props[tab]),
                  <button
                     className={styles.board__card_add}
                     onClick={this.openModal}
                     children={<PlusIcon />}
                  />,
               ]}
            />

            {this.state.isModalOpen && (
               <TravelForm
                  users={contacts}
                  onClose={this.closeModal}
                  onSubmit={() => {}}
               />
            )}
         </div>
      )
   }
}

const mapStateToProps = ({ userReducer, boardReducer }) => ({
   travels: userReducer.travels,
   contacts: userReducer.contacts,
   filter: boardReducer.historyFilter,
})
// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps)(UserBoard)
