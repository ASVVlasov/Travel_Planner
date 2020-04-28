import React from 'react'
import styles from './Sidebar.module.scss'

import { ReactComponent as TransportBtnSVG } from './images/transportBtn.svg';
import { ReactComponent as AccomodationBtnSVG } from './images/accomodationBtn.svg';
import { ReactComponent as EntertainmentBtnSVG } from './images/entertainmentBtn.svg';
import { ReactComponent as ToDoBtnSVG } from './images/toDoBtn.svg';

export default class Sidebar extends React.Component {
    render() {
        return (
            <div className={styles.sidebar}>
                <div className={styles.sidebar__wrapperTransportBtnSVG}>
                    <a href="#"><TransportBtnSVG/></a>
                </div>
                <div className={styles.sidebar__wrapperAccomodationBtnSVG}>
                    <a href="#"><AccomodationBtnSVG/></a>
                </div>
                <div className={styles.sidebar__wrapperEntertainmentBtnSVG}>
                    <a href="#"><EntertainmentBtnSVG/></a>
                </div>
                <div className={styles.sidebar__wrapperEntertainmentBtnSVG}>
                    <a href="#"><ToDoBtnSVG/></a>
                </div>
            </div>
        )
    }
}