import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./Board.module.scss";

import BoardSlider from "./BoardSlider";
import ButtonAddForm from "../TransportAddForm/TransportAddForm";
import Button from "../../controls/Button/Button";

export default class Board extends Component {
   static propTypes = {
      tabs: PropTypes.array, // TODO add .isRequired after the real data appears
   };

   FAKEprops = {
      // TODO remove object after the real data appears
      tabs: [
         {
            title: "Транспорт",
            link: "/",
            cards: [
               {
                  transport: "card1",
               },
               {
                  transport: "card2",
               },
               {
                  transport: "card3",
               },
            ],
         },
      ],
   };

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
         const { title, link, cards } = tab;
         const activeTab = link === window.location.pathname;

         if (activeTab) {
            this.setState({ activeTabLink: link });
         }
         if (activeTab && cards.length > 0) {
            cardsList.push(...cards);
         }

         return { title, link };
      });

      this.setState({ tabs: tabsList, cards: cardsList });
   };

   mapTabsToRender = () => {
      return this.state.tabs.map((tab, index) => {
         const activeTab = tab.link === this.state.activeTabLink;
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
         <div
            key={index} // TODO replace with Card component later
            children={card.transport}
         />
      ));
   };

   componentDidMount() {
      this.parsePropsToState();
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
                  <div key={1000} />, // TODO replace with AddCardButton(?) control later
               ]}
            />
         </div>
      );
   }
}
