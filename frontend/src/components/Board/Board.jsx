import React, { Component } from 'react'

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
               className={`board__tabs-link`}     // TODO add a dependency on chosen link
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
         <div className="board">

            <nav className="board__tabs">
               { tabs }
            </nav>

            { cards.length > 2 &&
               <div className="button">+</div>     // TODO replace with Button component
            }

            {/* TODO Replace with Slider component */}
            <div className="board__cards">
               { cards } 
            </div>
         </div>
      )
   }
}