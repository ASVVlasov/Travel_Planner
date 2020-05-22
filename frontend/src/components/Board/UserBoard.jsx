import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styles from './Board.module.scss'
import { NavLink, Link } from 'react-router-dom'

// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import BoardSlider from './BoardSlider'
import Button from '../../controls/Button/Button'

import { ReactComponent as PlusIcon } from '../../assets/images/icons/plus.svg'

class Board extends Component {
   // static propTypes = {}

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

   mapCardsToRender = () => {
      //TODO replace with Cards components
      if (this.props.match.params.tab === 'travels') {
         return this.props.travels.map((travel) => (
            <Link
               to={`/travel/${travel._id}/transport`}
               children={travel.title}
            />
         ))
      } else {
         return this.props.contacts.map((contact) => (
            <div
               key={contact._id}
               className={styles.board__card}
               children={contact.nickName}
            />
         ))
      }
   }

   // componentDidMount() {}
   // componentDidUpdate(prevProps) {}

   render() {
      return (
         <div className={styles.board}>
            <div className={styles.board__controlPanel}>
               <nav children={this.mapTabsToRender()} />

               {/* {this.props.cards.length > 2 && ( */}
               <Button
                  onClick={this.openModal}
                  text="Новая поездка"
                  kind="action"
               />
               {/* )} */}
            </div>

            <BoardSlider
               className={styles.board__cards}
               slides={[
                  ...this.mapCardsToRender(),
                  <button
                     className={styles.board__card_add}
                     onClick={this.openModal}
                     children={<PlusIcon />}
                  />,
               ]}
            />

            {/* {this.state.isModalOpen && <div children="Форма создания поездки" />} */}
         </div>
      )
   }
}

const mapStateToProps = ({ userReducer }) => ({
   travels: userReducer.travels,
   contacts: userReducer.contacts,
})
// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, null)(Board)
