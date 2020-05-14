import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Board.module.scss'
import { NavLink } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBoard } from '../../redux/actions/board.actions'
import { getCards } from '../../redux/actions/cards.actions'

import CardForm from '../CardForm/CardForm'
import BoardSlider from './BoardSlider'
import Button from '../../controls/Button/Button'
import TransportCardShort from '../Cards/TransportCardShort'

import { ReactComponent as PlusIcon } from '../../assets/images/icons/plus.svg'

class Board extends Component {
   static propTypes = {
      getBoard: PropTypes.func.isRequired,
      getCards: PropTypes.func.isRequired,
      tabs: PropTypes.array.isRequired,
      cards: PropTypes.array.isRequired,
   }

   state = {
      isModalOpen: false,
   }

   openModal = () => {
      this.setState({ isModalOpen: true })
   }

   closeModal = () => {
      this.setState({ isModalOpen: false })
   }

   mapTabsToRender = () => {
      return this.props.tabs.map((tab) => (
         <NavLink
            exact
            to={`${tab._id}`}
            className={styles.board__tabsLink}
            activeClassName={styles.board__tabsLink_active}
            children={tab.title}
            key={tab._id}
         />
      ))
   }

   mapCardsToRender = () => {
      return this.props.cards.map((card) => (
         <div key={card._id} className={styles.board__card}>
            <TransportCardShort {...card} />
         </div>
      ))
   }

   componentDidMount() {
      const {
         getBoard,
         match: {
            params: { travelId, board, tab },
         },
      } = this.props

      getBoard(travelId, board.toUpperCase(), tab)
   }

   componentDidUpdate(prevProps) {
      const {
         getBoard,
         getCards,
         match: {
            params: { travelId, board, tab },
         },
      } = this.props

      if (prevProps.match.params.board !== board) {
         getBoard(travelId, board.toUpperCase(), tab)
      }
      if (prevProps.match.params.tab !== tab) {
         getCards(tab)
      }
   }

   render() {
      return (
         <div className={styles.board}>
            <div className={styles.board__controlPanel}>
               <nav className={styles.board__tabs}>
                  {this.mapTabsToRender()}
               </nav>

               {this.props.cards.length > 2 && (
                  <Button onClick={this.openModal} size="small" text="+" />
               )}
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

            {this.state.isModalOpen && (
               <CardForm
                  onClose={this.closeModal}
                  category={this.props.match.params.board}
               />
            )}
         </div>
      )
   }
}

const mapStateToProps = ({ boardReducer }) => ({
   tabs: boardReducer.tabs,
   cards: boardReducer.cards,
   isLoading: boardReducer.isLoading,
   failureLoading: boardReducer.failureLoading,
   errorMessage: boardReducer.errorMessage,
})
const mapDispatchToProps = (dispatch) =>
   bindActionCreators({ getBoard, getCards }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Board)
