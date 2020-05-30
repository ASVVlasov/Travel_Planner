import React from 'react'
import styles from './Sidebar.module.scss'
import { Switch, Redirect, NavLink } from 'react-router-dom'

import { ReactComponent as TransportBtnSVG } from '../../assets/images/icons/plane.svg'
import { ReactComponent as AccomodationBtnSVG } from '../../assets/images/icons/house.svg'
import { ReactComponent as EntertainmentBtnSVG } from '../../assets/images/icons/theater.svg'
import { ReactComponent as ToDoBtnSVG } from '../../assets/images/icons/clipboard.svg'

export default class Sidebar extends React.Component {
   render() {
      const { url } = this.props.match
      return (
         <>
            <div className={styles.sidebar}>
               <NavLink
                  className={styles.sidebar__link}
                  activeClassName={styles.sidebar__link_active}
                  to={`${this.props.match.url}/transport/`}
                  children={<TransportBtnSVG />}
               />
               <NavLink
                  className={styles.sidebar__link}
                  activeClassName={styles.sidebar__link_active}
                  to={`${this.props.match.url}/accomodation/`}
                  children={<AccomodationBtnSVG />}
               />
               <NavLink
                  className={styles.sidebar__link}
                  activeClassName={styles.sidebar__link_active}
                  to={`${this.props.match.url}/entertainment/`}
                  children={<EntertainmentBtnSVG />}
               />
               <NavLink
                  className={styles.sidebar__link}
                  activeClassName={styles.sidebar__link_active}
                  to={`${this.props.match.url}/todo/`}
                  children={<ToDoBtnSVG />}
               />
            </div>

            <Switch>
               <Redirect
                  exact
                  from={`${url}/transport/`}
                  to={`${url}/transport/all`}
               />
               <Redirect
                  exact
                  from={`${url}/accomodation/`}
                  to={`${url}/accomodation/all`}
               />
               <Redirect
                  exact
                  from={`${url}/entertainment/`}
                  to={`${url}/entertainment/all`}
               />
               <Redirect exact from={`${url}/todo/`} to={`${url}/todo/all`} />
            </Switch>
         </>
      )
   }
}
