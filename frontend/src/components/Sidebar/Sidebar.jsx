import React from 'react'
import styles from './Sidebar.module.scss'

import { ReactComponent as TransportBtnSVG } from '../../assets/images/icons/plane.svg';
import { ReactComponent as AccomodationBtnSVG } from '../../assets/images/icons/house.svg';
import { ReactComponent as EntertainmentBtnSVG } from '../../assets/images/icons/theater.svg';
import { ReactComponent as ToDoBtnSVG } from '../../assets/images/icons/clipboard.svg';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className={styles.sidebar}>
                <div className={styles.sidebar__wrapperTransportBtnSVG}>
                    <a className={`${styles.sidebar__link} ${styles.sidebar__link_active}`} href="#"><TransportBtnSVG/></a>
                </div>
                <div className={styles.sidebar__wrapperAccomodationBtnSVG}>
                    <a className={styles.sidebar__link} href="#"><AccomodationBtnSVG/></a>
                </div>
                <div className={styles.sidebar__wrapperEntertainmentBtnSVG}>
                    <a className={styles.sidebar__link} href="#"><EntertainmentBtnSVG/></a>
                </div>
                <div className={styles.sidebar__wrapperEntertainmentBtnSVG}>
                    <a className={styles.sidebar__link} href="#"><ToDoBtnSVG/></a>
                </div>
            </div>
        )
    }
}