import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './Board.module.scss'

import BoardSlider from './BoardSlider'
import Button from '../../controls/Button/Button'
 
export default class Board extends Component {
   FAKEprops = {     // TODO remove object after the real data appears
      tabs: [
         {
            title: 'Транспорт',
            link: '/transport',
            cards: [
               {
                  transport: 'card1' 
               }, 
               {
                  transport: 'card2' 
               }, 
               {
                  transport: 'card3' 
               },
            ],
         },
         {
            title: 'Авиа',
            link: '/transport/planes',
            cards: [
               {
                  transport: 'card777' 
               },
            ],
         },
         {
            title: 'Машины',
            link: '/transport/cars',
            cards: [],
         },
      ]
   }
   state = {
      tabs: [],
      cards: [],
   }

   parsePropsToState = () => {
      const tabsList = []
      const cardsList = []

      this.FAKEprops.tabs.forEach( (tab, index) => {     // TODO remove 'FAKE' after the real data appears
         let activeTab = tab.link === window.location.pathname ? true : false

         tabsList.push(
            <a                                    // TODO replace with Router(?) later
               className={ classNames(
                  styles["board__tabsLink"], 
                  activeTab && styles["board__tabsLink_active"],
               )}
               href={ tab.link }
               children = { tab.title }
               key={ index }
            />
         )

         if (activeTab && tab.cards.length > 0) {
            tab.cards.forEach( (card, index) => {
               cardsList.push(
                  <div              // TODO replace with Card component later
                     key={ index } 
                     children={ card.transport }
                  />
               )
            })
         }
      })

      this.setState({ tabs: tabsList, cards: cardsList })
   }

   componentDidMount () {
      this.parsePropsToState()
   }

   render () {
      const { tabs, cards } = this.state

      return (
         <div className={ styles.board }>

            <div className={ styles["board__controlPanel"] }>
               <nav className={ styles["board__tabs"] }>
               { tabs }
            </nav>

            { cards.length > 2 &&
                  <Button size="small" text="+"/>
            }
            </div>

            <BoardSlider className={ styles["board__cards"] } slides={ cards }/>
         </div>
      )
   }
}