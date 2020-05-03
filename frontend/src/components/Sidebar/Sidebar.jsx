import React from 'react'
import styles from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom';

import { ReactComponent as TransportBtnSVG } from '../../assets/images/icons/plane.svg';
import { ReactComponent as AccomodationBtnSVG } from '../../assets/images/icons/house.svg';
import { ReactComponent as EntertainmentBtnSVG } from '../../assets/images/icons/theater.svg';
import { ReactComponent as ToDoBtnSVG } from '../../assets/images/icons/clipboard.svg';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className={styles.sidebar}>
                <NavLink className={styles.sidebar__link} activeClassName={styles.sidebar__link_active} to='transport'><TransportBtnSVG/></NavLink>
                <NavLink className={styles.sidebar__link} activeClassName={styles.sidebar__link_active} to='accomodation'><AccomodationBtnSVG/></NavLink>
                <NavLink className={styles.sidebar__link} activeClassName={styles.sidebar__link_active} to='entertainment'><EntertainmentBtnSVG/></NavLink>
                <NavLink className={styles.sidebar__link} activeClassName={styles.sidebar__link_active} to='todo'><ToDoBtnSVG/></NavLink>
            </div>
        )
    }
}