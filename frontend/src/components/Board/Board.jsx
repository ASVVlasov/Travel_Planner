import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Board.module.scss'
import { NavLink } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBoard } from '../../redux/board/operations'
import { getCards } from '../../redux/cards/actions'

import BoardSlider from './BoardSlider'
import Button from '../../controls/Button/Button'
import CardFormContainer from '../../containers/CardFormContainer'
import CardShort from '../Cards/CardShort'

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
            <CardShort {...card} />
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

            {this.props.match.params.board !== 'todo' && (
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
            )}

            {this.state.isModalOpen && (
               <CardFormContainer onClose={this.closeModal} />
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
