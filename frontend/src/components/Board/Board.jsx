import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Board.module.scss'

import ButtonAddForm from "../TransportAddForm/TransportAddForm";
import BoardSlider from './BoardSlider'
import Button from '../../controls/Button/Button'
import { ReactComponent as PlusIcon } from '../../assets/images/icons/plus.svg'
import TransportCard from '../Cards/TransportCardShort'

export default class Board extends Component {
   static propTypes = {
      tabs: PropTypes.array, // TODO add .isRequired after the real data appears
   }

   FAKEprops = {
      // TODO remove object after the real data appears
      tabs: [
         {
            title: "Транспорт",
            link: "/",
            cards: [
               {
                  transport: 'Перелет',
                  company: 'Аэрофлот',
                  departurePlace: 'Москва, Шереметьево',
                  departureDate: '24.06.2020 08:20',
                  arrivalPlace: 'Прага',
                  arrivalDate: '24.06.2020 10:30',
                  attachments: [{ name: 'Билеты', path: '#' }],
                  payer: '_id',
                  travelers: [
                     { login: 'me', avatarPath: 'path' },
                     { login: 'user1', avatarPath: 'path' },
                     { login: 'user2', avatarPath: 'path' },
                  ],
                  comment: '',
                  cost: 0,
               },
               {
                  transport: 'Машина в аренду',
                  company: 'Sixt',
                  departurePlace: 'Прага, аэропорт',
                  departureDate: '24.06.2020 11:30',
                  arrivalPlace: 'Рига, центр города',
                  arrivalDate: '10.07.2020 16:00',
                  attachments: [{ name: 'Бронь.pdf', path: '#' }],
                  payer: null,
                  travelers: [
                     { login: 'me', avatarPath: 'path' },
                     { login: 'user1', avatarPath: 'path' },
                     { login: 'user2', avatarPath: 'path' },
                  ],
                  comment:
                     'Забронирован VW POLO на механке. Водитель Серега. Оплата на месте, депозит на карте 600 евро',
                  cost: 0,
               },
               {
                  transport: 'Перелет',
                  company: 'AirBaltic',
                  departurePlace: 'Рига',
                  departureDate: '10.07.2020 18:40',
                  arrivalPlace: 'Москва, Внуково',
                  arrivalDate: '10.07.2020 21:30',
                  attachments: [{ name: 'Билет', path: '#' }],
                  payer: '_id',
                  travelers: [
                     { login: 'user1', avatarPath: 'path' },
                     { login: 'user2', avatarPath: 'path' },
                  ],
                  comment: '',
                  cost: 0,
               },
            ],
         },
      ],
   }

   state = {
      activeTabLink: "",
      tabs: [],
      cards: [],
      isModalOpen: false,
   };

   parsePropsToState = () => {
      const cardsList = [];

      const tabsList = this.FAKEprops.tabs.map((tab) => {
         // TODO remove 'FAKE' after the real data appears
         const { title, link, cards } = tab
         const activeTab = link === window.location.pathname

         if (activeTab) {
            this.setState({ activeTabLink: link })
         }
         if (activeTab && cards.length > 0) {
            cardsList.push(...cards)
         }

         return { title, link };
      });

      this.setState({ tabs: tabsList, cards: cardsList });
   };

   mapTabsToRender = () => {
      return this.state.tabs.map((tab, index) => {
         const activeTab = tab.link === this.state.activeTabLink
         return (
            <a
               key={index} // TODO replace with Router(?) later
               className={classNames(
                  styles.board__tabsLink,
                  activeTab && styles.board__tabsLink_active
               )}
               href={tab.link}
               children={tab.title}
            />
         );
      });
   };

   mapCardsToRender = () => {
      return this.state.cards.map((card, index) => (
         <div key={index}>
            <TransportCard {...card} />
         </div>
      ))
   }

   componentDidMount() {
      this.parsePropsToState()
   }
    openModal = () => {
      this.setState({ isModalOpen: true });
   };

   closeModal = () => {
      this.setState({ isModalOpen: false });
   };

   render() {
      return (
         <div className={styles.board}>
            <div className={styles.board__controlPanel}>
               <nav className={styles.board__tabs}>
                  {this.mapTabsToRender()}
               </nav>

               {this.state.cards.length > 2 && (
                  <Button onClick={this.openModal} size="small" text="+" />
               )}
            </div>
            {this.state.isModalOpen && (
               <ButtonAddForm onClose={this.closeModal} />
            )}
            <BoardSlider
               className={styles.board__cards}
               slides={[
                  ...this.mapCardsToRender(),
                  <button
                     className={styles.board__cards_add}
                     onClick={() => {}}
                     children={<PlusIcon />}
                  />,
               ]}
            />
         </div>
      );
   }
}
